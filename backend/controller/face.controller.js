const path = require("path");
const fs = require("fs");
const canvas = require("canvas");
const faceapi = require("face-api.js");
const Employee = require("../models/employee-model");

// TensorFlow muhitini sozlash
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Modellarni yuklash funksiyasi
let modelsLoaded = false; // Modellarni faqat bir marta yuklashni ta'minlash uchun flag

const loadModels = async () => {
  if (modelsLoaded) return; // Agar modellari allaqachon yuklangan bo'lsa, yana yuklamang

  const modelPath = path.join(__dirname, "../models");
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath); // Yuzni aniqlash modeli
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath); // Yuz nuqtalarini aniqlash modeli
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath); // Yuz descriptor modeli
  modelsLoaded = true;
};

// Rasmni kichiklashtirish (tepadan o‘zgartirilgan)
const resizeImage = (image, width = 300, height = 300) => {
  const canvasResized = canvas.createCanvas(width, height);
  const ctx = canvasResized.getContext("2d");
  ctx.drawImage(image, 0, 0, width, height);
  return canvasResized;
};

// Yuzni tahlil qilish va tasdiqlash
const verifyFace = async (req, res, next) => {
  try {
    // Faylni olish va saqlash
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "Rasm yuklanmagan!" });
    }
    const { id } = req.body;
    const file = req.files.image;
    const filePath = path.join(__dirname, "../static", file.name);
    await file.mv(filePath); // Faylni static papkaga saqlash

    // Rasmni yuklash va tahlil qilish
    const image = await canvas.loadImage(filePath);
    const resizedImage = resizeImage(image); // Rasmni kichiklashtirish

    const detection = await faceapi
      .detectSingleFace(resizedImage) // Yuzni aniqlash
      .withFaceLandmarks() // Yuz nuqtalarini olish
      .withFaceDescriptor(); // Yuz descriptorini olish

    // Agar yuz topilmasa
    if (!detection) {
      fs.unlinkSync(filePath); // Faylni o‘chirish
      return res.status(404).json({ message: "Rasmda yuz topilmadi!" });
    }

    const employee = await Employee.findById(id);

    // Bazadagi rasmni yuklash va tahlil qilish
    const employeeImagePath = path.join(__dirname, "../static", employee.image);
    const employeeImage = await canvas.loadImage(employeeImagePath);
    const resizedEmployeeImage = resizeImage(employeeImage); // Rasmni kichiklashtirish

    const detectionEmployee = await faceapi
      .detectSingleFace(resizedEmployeeImage) // Bazadagi rasmni tahlil qilish
      .withFaceLandmarks()
      .withFaceDescriptor(); // Yuzni descriptorini olish

    if (!detectionEmployee) {
      fs.unlinkSync(filePath); // Faylni o‘chirish
      return res.status(404).json({ message: "Bazadagi rasmda yuz topilmadi!" });
    }

    // Descriptorlar bilan taqqoslash
    const isMatch = compareFaceDescriptors(detectionEmployee.descriptor, detection.descriptor);

    // Yuzlar mos kelsa
    if (isMatch) {
      fs.unlinkSync(filePath); // Faylni o‘chirish
      return res.status(200).json({ message: "Yuz muvaffaqiyatli tasdiqlandi!" });
    } else {
      fs.unlinkSync(filePath); // Faylni o‘chirish
      return res.status(400).json({ message: "Yuz mos kelmaydi!" });
    }
  } catch (error) {
    console.log(error);
    next(error); // Xatolikni middleware'ga uzatish
  }
};

// Yuzlarni taqqoslash
const compareFaceDescriptors = (descriptor1, descriptor2) => {
  const distance = faceapi.euclideanDistance(descriptor1, descriptor2); // Ikki descriptor orasidagi masofani hisoblash
  return distance < 0.6; // Agar masofa 0.6 dan kichik bo‘lsa, yuzlar o‘xshash
};

module.exports = {
  loadModels,
  verifyFace,
};
