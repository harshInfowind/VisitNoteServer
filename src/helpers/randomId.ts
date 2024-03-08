import * as crypto from "crypto";

export function generateRandomHexIds(){
    return crypto.randomBytes(16).toString("hex")
}