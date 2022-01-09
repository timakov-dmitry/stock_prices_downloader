import {promisify} from "util";
import * as fs from "fs";


export const writeFileAsync = promisify(fs.writeFile)
export const readFileAsync = promisify(fs.readFile)

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
