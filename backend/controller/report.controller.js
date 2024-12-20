const ExcelJS = require("exceljs");
const WorkReport = require("../models/work.report.model");

const generateReport = async (req, res, next) => {
  try {
    const { startDate, endDate, userId } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date va end date talab qilinadi." });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Noto'g'ri sana formati." });
    }

    const query = { date: { $gte: start, $lte: end } };
    if (userId) query.userId = userId;

    const workReports = await WorkReport.find(query).populate("userId");

    if (!workReports || workReports.length === 0) {
      return res.status(404).json({ message: "Hisobot topilmadi." });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Hisobot");

    worksheet.columns = [
      { header: "Foydalanuvchi", key: "user", width: 20 },
      { header: "Sanasi", key: "date", width: 15 },
      { header: "Ish boshlash vaqti", key: "startTime", width: 20 },
      { header: "Ish tugatish vaqti", key: "endTime", width: 20 },
      { header: "Ish vaqti (soat)", key: "workHours", width: 15 },
    ];

    const userWorkData = {};

    workReports.forEach((report) => {
      const startTime = new Date(report.startTime);
      const endTime = new Date(report.endTime);

      // Kunlar va soatlar orasidagi farqni hisoblash
      const timeDiff = endTime - startTime; // Millisekundlarda farq
      const hours = Math.floor(timeDiff / (1000 * 60 * 60)); // Soat
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Daqiqalar
      const days = Math.floor(hours / 24); // Kunlar

      // Foydalanuvchi uchun ishlagan kun va soatlarni hisoblash
      const userId = report.userId._id.toString();
      if (!userWorkData[userId]) {
        userWorkData[userId] = {
          user: report.userId.firstname || "Noma'lum foydalanuvchi",
          totalDays: 0,
          totalHours: 0,
          totalMinutes: 0,
          workDaysList: new Set(), // Foydalanuvchining ishlagan kunlarini saqlash uchun Set
        };
      }

      // Foydalanuvchi ishlagan kunni saqlash
      const workDate = report.date.toISOString().split("T")[0]; // Sana faqat kun qismini olish
      userWorkData[userId].workDaysList.add(workDate); // Ishlangan kunlarni qo'shish

      // Jami soat va daqiqalarni hisoblash
      userWorkData[userId].totalHours += hours;
      userWorkData[userId].totalMinutes += minutes;

      // Hisobotga qo'shish
      worksheet.addRow({
        user: report.userId.firstname || "Noma'lum foydalanuvchi",
        date: report.date.toISOString().split("T")[0],
        startTime: report.startTime || "Noma'lum",
        endTime: report.endTime || "Noma'lum",
        workHours: `${hours} soat ${minutes} daqiqa`,
      });
    });

    // Foydalanuvchining jami ishlagan kunlari va soatlari
    Object.values(userWorkData).forEach((data) => {
      let totalWorkHours = data.totalHours;
      let totalWorkMinutes = data.totalMinutes;

      // Daqiqalarni soatga aylantirish
      totalWorkHours += Math.floor(totalWorkMinutes / 60); // Daqiqalarni soatga aylantiradi
      totalWorkMinutes = totalWorkMinutes % 60; // Qolgan daqiqalarni saqlaydi

      // Hisobotga jami ishlagan kunlarni qo'shish
      worksheet.addRow({
        user: "Jami",
        workHours: `${totalWorkHours} soat ${totalWorkMinutes} daqiqa`,
      });
    });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent("hisobot.xlsx")}"`);
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
    next(error);
  }
};

module.exports = {
  generateReport,
};
