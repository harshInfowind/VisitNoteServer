"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionModule = void 0;
const ENUM_EVENTS_1 = require("../helpers/ENUM_EVENTS");
const mongooseExport_1 = require("../models/mongooseExport");
require("dotenv/config");
function connection() {
    const databaseTestUrl = process.env.DB_TEST_URL;
    return new Promise(async (res, rej) => {
        try {
            await mongooseExport_1.mongooseInstance.connect(databaseTestUrl);
            res(ENUM_EVENTS_1.INITIAL_CONNECTION_ESTABLISHED);
        }
        catch (error) {
            rej(Error(`Error in connection establishment\n ${error}`));
        }
    });
}
exports.connectionModule = connection;
//# sourceMappingURL=config.js.map