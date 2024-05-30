import { Router } from "express";

export abstract class BaseRouter {
  protected path!: string;
  protected router!: Router;

  constructor(path: string) {
    this.path = path;
    this.router = Router();
  }

  abstract register(): Router;
}
