import { BaseRouter } from "../../api/base/Router";
import { Server } from "./Server";

export function startServer(routers: BaseRouter[]) {
  return new Server(routers);
}
