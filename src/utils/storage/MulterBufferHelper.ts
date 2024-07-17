import multer from "multer";
import path from "path";

export class MulterBufferHelper {
  public upload: multer.Multer;
  private storage: multer.StorageEngine;

  constructor(fileSize: number) {
    this.storage = multer.memoryStorage();
    this.upload = multer({
      storage: this.storage,
      limits: {
        fileSize,
      },
    });
  }
}

export const multerBufferHelper = new MulterBufferHelper(5e6);
