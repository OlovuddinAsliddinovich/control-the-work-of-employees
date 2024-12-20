const WorkReport = require("../models/work.report.model");

// Ishni boshlash
const startWork = async (req, res, next) => {
  try {
    const { userId } = req.body; // Foydalanuvchi ID sini olish
    const date = new Date().toISOString().split("T")[0]; // Bugungi sana (yyyy-mm-dd)
    const startTime = new Date();

    // Yangi ish hisobi yaratish
    const workReport = new WorkReport({
      userId,
      date,
      startTime,
    });

    // Ishni boshlaganidan so'ng 12 soat ichida tugatilmasa, o'chirilishi kerak
    const timeout = setTimeout(async () => {
      const expiredReport = await WorkReport.findOne({
        userId,
        date,
        endTime: { $exists: false }, // Ish tugatilmagan yozuvni qidiramiz
      });

      if (expiredReport) {
        await expiredReport.delete(); // Ishni tugatmasdan o'chirish
        console.log("Ish tugatilmagan, ish hisobi o'chirildi.");
      }
    }, 12 * 60 * 60 * 1000); // 12 soat (soatni millisekundga aylantirish)

    // Ish hisobi saqlanadi
    await workReport.save();

    // Ishni tugatmasdan o'chirilishini kuzatish uchun timeoutni saqlash
    workReport.timeoutId = timeout;
    await workReport.save();

    res.status(200).json({ message: "Ish boshlash vaqti saqlandi.", workReport });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Ishni tugatish
const endWork = async (req, res, next) => {
  try {
    const { userId } = req.body; // Foydalanuvchi ID sini olish
    const date = new Date().toISOString().split("T")[0]; // Bugungi sana (yyyy-mm-dd)
    const endTime = new Date();

    // Foydalanuvchining bugungi ish hisobotini olish
    const workReport = await WorkReport.findOne({
      userId,
      date,
      endTime: { $exists: false }, // EndTime bo'lmagan yozuvni topamiz
    });

    if (!workReport) {
      return res.status(400).json({ message: "Ish boshlanmagan yoki avvalgi ish tugatilmagan!" });
    }

    // Ishni tugatish
    workReport.endTime = endTime;

    // Ish vaqti (soatlar)ni hisoblash
    const workDuration = (endTime - workReport.startTime) / (1000 * 60 * 60); // Millisekunddan soatlarga o‘tkazish
    workReport.workHours = workDuration;

    // Agar timeout bo'lsa, uni to'xtatish
    if (workReport.timeoutId) {
      clearTimeout(workReport.timeoutId);
    }

    await workReport.save();
    res.status(200).json({ message: "Ish tugatildi va vaqt saqlandi.", workReport });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  startWork,
  endWork,
};
