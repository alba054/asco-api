import multer from "multer";
import path from "path";

export class MulterHelper {
  private storage: multer.StorageEngine;
  public upload: multer.Multer;

  constructor(fileSize: number) {
    this.storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "media");
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
      },
    });
    this.upload = multer({
      storage: this.storage,
      limits: {
        fileSize,
      },
    });
  }
}

export const multerHelper = new MulterHelper(5e6);
