import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { FileHandler } from "./FileHandler";
import { RESPONSE_MESSAGE, createResponse } from "../../../utils";
import { gcsHelper } from "../../../utils/storage/GCSHelper";
import path from "path";

export class FileHandlerImpl extends FileHandler {
  async getFile(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { filename } = req.headers;
    try {
      const file = await gcsHelper.accessFile(String(filename));

      return res.header("X-ext").send(file);
    } catch (error) {
      return next(error);
    }
  }

  async postFile(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    try {
      const file = await gcsHelper.uploadFile(
        req.file?.buffer ?? Buffer.from([0]),
        path.extname(req.file?.originalname ?? "")
      );

      return res
        .status(201)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, file));
    } catch (error) {
      return next(error);
    }
  }
}
