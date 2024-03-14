"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongooseExport_1 = require("./mongooseExport");
const user = new mongooseExport_1.mongooseInstance.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true,
    }
});
exports.User = mongooseExport_1.mongooseInstance.model("User", user);
//# sourceMappingURL=user.js.map