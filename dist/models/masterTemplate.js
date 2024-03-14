"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterTemplate = void 0;
const mongooseExport_1 = require("./mongooseExport");
const masterTemplateSchema = new mongooseExport_1.mongooseInstance.Schema({
    title: {
        type: String,
        required: true
    },
    sections: {
        Subjective: {
            type: String
        },
        Objective: {
            type: String
        },
        Assessment: {
            type: String
        },
        Plan: {
            type: String
        },
    }
});
const MasterTemplateModel = mongooseExport_1.mongooseInstance.model("masterTemplate", masterTemplateSchema);
exports.MasterTemplate = MasterTemplateModel;
//# sourceMappingURL=masterTemplate.js.map