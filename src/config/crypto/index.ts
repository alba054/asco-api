import { bcryptHash } from "./BcryptImpl";
import { HashAbstract } from "./HashAbstract";

function loadHashImpl(hashImpl: HashAbstract) {
  return hashImpl;
}

export const hashImpl = loadHashImpl(bcryptHash);
