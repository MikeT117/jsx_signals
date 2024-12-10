import { LOGLEVEL } from "../constants";

export function logger(type, level, ...args) {
    if (LOGLEVEL >= level) {
        console.log("LOG: ", { type, ...args });
    }
}
