import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
import { CONFIG_ENV } from "../env";
import { ErrorHandler } from "../../middleware/error/ErrorHandler";
import cookieParser from "cookie-parser";
import { BaseRouter } from "../../api/base/Router";

export class Server {
  private app: express.Application;
  private routers: BaseRouter[];

  constructor(routers: BaseRouter[]) {
    this.app = express();
    this.routers = routers;
    this.config();
  }

  config() {
    // * handling json
    this.app.use(express.json());
    // * handling cookies key-value based
    this.app.use(cookieParser());
    // * handling cors to front end web
    this.app.use(
      cors({
        origin: "*",
      })
    );
    // * disable express watermark
    this.app.disable("x-powered-by");
    // * updgrade http security
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      res.setHeader("Content-Security-Policy", "upgrade-insecure-requests");
      next();
    });

    // * static file mounting path
    this.app.use(
      "/api/uploaded-file",
      express.static(process.env.STATIC_URL ?? "media")
    );

    // * api base route
    this.routers.forEach((router) => {
      this.app.use("/api", router.register());
    });

    // * error handling
    this.app.use(ErrorHandler);
  }

  start() {
    this.app.listen(
      parseInt(CONFIG_ENV.PORT ?? "5050"),
      CONFIG_ENV.HOST || "127.0.0.1",
      () => {
        console.log(
          `server is running on ${CONFIG_ENV.HOST ?? "127.0.0.1"}:${
            CONFIG_ENV.PORT ?? 5050
          }`
        );
      }
    );
  }
}
