"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sections = void 0;
const mongooseExport_1 = require("./mongooseExport");
const sectionSchema = new mongooseExport_1.mongooseInstance.Schema({
    category: {
        type: String,
        required: true,
    },
    templates: {
        type: [{
                templateId: {
                    type: String,
                },
                title: {
                    type: String,
                },
            }],
        default: []
    }
});
const SectionsModel = mongooseExport_1.mongooseInstance.model('sections', sectionSchema);
exports.Sections = SectionsModel;
//# sourceMappingURL=sections.js.map