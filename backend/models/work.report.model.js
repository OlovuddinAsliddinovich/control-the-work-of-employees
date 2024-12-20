const mongoose = require("mongoose");

const workReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  date: { type: Date, required: true }, // Ishning sanasi
  startTime: { type: Date, required: true }, // Ish boshlash vaqti
  endTime: { type: Date, required: false }, // Ish tugatish vaqti
  workHours: { type: Number, default: 0 }, // Soatlar
});

const WorkReport = mongoose.model("WorkReport", workReportSchema);

module.exports = WorkReport;
