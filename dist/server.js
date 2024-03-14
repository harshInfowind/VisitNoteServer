"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express = require("express");
const http = require("http");
const ENUM_EVENTS_1 = require("./helpers/ENUM_EVENTS");
const config_1 = require("./database/config");
const sectionTemplates_1 = require("./router/sectionTemplates");
const masterTemplate_1 = require("./router/masterTemplate");
const cors = require("cors");
const port = process.env.PORT;
exports.app = express();
exports.app.use(express.json());
exports.app.use(express.urlencoded({ extended: true }));
exports.app.use(cors({
    origin: "*",
    credentials: true
}));
(0, config_1.connectionModule)()
    .then((res) => {
    if (res === ENUM_EVENTS_1.INITIAL_CONNECTION_ESTABLISHED) {
        exports.app.use("/", sectionTemplates_1.sectionTemplate);
        exports.app.use("/", masterTemplate_1.masterTemplateRoutes);
        const server = http.createServer(exports.app);
        server.listen(port, async () => console.log(`SERVER RUNNING AT PORT::${port}`));
    }
})
    .catch((err) => {
    console.log("CONNECTION Related Issue", err);
});
//# sourceMappingURL=server.js.map