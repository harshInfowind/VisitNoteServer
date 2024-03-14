"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomHexIds = void 0;
const crypto = require("crypto");
function generateRandomHexIds() {
    return crypto.randomBytes(16).toString("hex");
}
exports.generateRandomHexIds = generateRandomHexIds;
//# sourceMappingURL=randomId.js.map