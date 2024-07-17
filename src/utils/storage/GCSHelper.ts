import { DownloadResponse, Storage } from "@google-cloud/storage";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { ERRORCODE } from "..";

export class GCSHelper {
  private storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  async uploadFile(file: Buffer, ext?: string): Promise<string> {
    const bucketName = "asco-app-2905.appspot.com";
    const filename = `${String(new Date().getTime())}${ext}`;

    try {
      const streamer = this.storage.bucket(bucketName).file(filename);

      await streamer.save(file);

      console.log("File uploaded successfully!");
      return filename;
    } catch (error) {
      console.log(error);

      throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, "upload fails");
    }
  }

  async accessFile(filename: string): Promise<Buffer | null> {
    try {
      const bucket = this.storage.bucket("asco-app-2905.appspot.com");
      const file = bucket.file(filename);

      // Alternatively, access the object content directly:
      const data = await file.download();

      return data[0];
    } catch (error) {
      throw new BadRequestError(
        ERRORCODE.BAD_REQUEST_ERROR,
        "error accessing file"
      );
    }
  }
}

export const gcsHelper = new GCSHelper();
