const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
class FileService {
  saveImage(image) {
    try {
      const ext = path.extname(image.name);
      const fileName = uuidv4() + ext;
      const currentDir = __dirname;
      const staticDir = path.join(currentDir, "..", "static");
      const filePath = path.join(staticDir, fileName);

      if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir, { recursive: true });
      }

      image.mv(filePath);

      return fileName;
    } catch (error) {
      console.log("Rasmni saqlashda xatolik", error);
    }
  }

  deleteImage(fileName) {
    try {
      const currentDir = __dirname;
      const staticDir = path.join(currentDir, "..", "static");
      const filePath = path.join(staticDir, fileName);
      fs.unlinkSync(filePath);
    } catch (error) {
      console.log("Rasmni o'chirishda xatolik", error);
    }
  }
}

module.exports = new FileService();
