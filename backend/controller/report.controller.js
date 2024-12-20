const ExcelJS = require("exceljs");
const WorkReport = require("../models/work.report.model");

const generateReport = async (req, res, next) => {
  try {
    const { startDate, endDate, userId } = req.query;

    // Sana tekshiruv
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date va end date talab qilinadi." });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Noto'g'ri sana formati." });
    }

    // Query yaratish
    const query = { date: { $gte: start, $lte: end } };
    if (userId) query.userId = userId;

    const workReports = await WorkReport.find(query).populate("userId");

    if (!workReports || workReports.length === 0) {
      return res.status(404).json({ message: "Hisobot topilmadi." });
    }

    // Excel fayli yaratish
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Hisobot");

    // Ustunlar yaratish
    worksheet.columns = [
      { header: "Foydalanuvchi", key: "user", width: 20 },
      { header: "Sanasi", key: "date", width: 15 },
      { header: "Ish boshlash vaqti", key: "startTime", width: 20 },
      { header: "Ish tugatish vaqti", key: "endTime", width: 20 },
      { header: "Ish vaqti (soat)", key: "workHours", width: 20 },
    ];

    // Umumiy ishlagan vaqtni hisoblash
    const userWorkData = {};

    workReports.forEach((report) => {
      const startTime = new Date(report.startTime);
      const endTime = new Date(report.endTime);

      // Vaqtlar farqini hisoblash
      const timeDiff = endTime - startTime; // Millisekundlarda
      const hours = Math.floor(timeDiff / (1000 * 60 * 60)); // Soatlar
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Daqiqalar

      const userId = report.userId._id.toString();
      if (!userWorkData[userId]) {
        userWorkData[userId] = {
          user: report.userId.firstname || "Noma'lum foydalanuvchi",
          totalHours: 0,
          totalMinutes: 0,
        };
      }

      // Foydalanuvchi ishlagan soatlarni hisoblash
      userWorkData[userId].totalHours += hours;
      userWorkData[userId].totalMinutes += minutes;

      // Har bir ish kuni uchun qator qo'shish
      worksheet.addRow({
        user: report.userId.firstname || "Noma'lum foydalanuvchi",
        date: report.date.toISOString().split("T")[0],
        startTime: startTime.toLocaleTimeString("uz-UZ"),
        endTime: endTime.toLocaleTimeString("uz-UZ"),
        workHours: `${hours} soat ${minutes} daqiqa`,
      });
    });

    // Jami ishlagan soatlarni hisoblash va qo'shish
    Object.values(userWorkData).forEach((data) => {
      let totalHours = data.totalHours;
      let totalMinutes = data.totalMinutes;

      // Daqiqalarni soatga aylantirish
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes = totalMinutes % 60;

      worksheet.addRow({
        user: `${data.user} (Jami)`,
        date: "—",
        startTime: "—",
        endTime: "—",
        workHours: `${totalHours} soat ${totalMinutes} daqiqa`,
      });
    });

    // Excel faylini javobga yozish
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent("hisobot.xlsx")}"`);
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
    next(error);
  }
};

module.exports = { generateReport };
