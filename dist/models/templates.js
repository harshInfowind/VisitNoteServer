"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Templates = void 0;
const mongooseExport_1 = require("./mongooseExport");
const templateSchema = new mongooseExport_1.mongooseInstance.Schema({
    category: {
        categoryId: {
            type: mongooseExport_1.mongooseInstance.Schema.ObjectId,
            required: true,
            unique: false
        },
        categoryName: {
            type: String,
            required: true,
            unique: false
        }
    },
    title: {
        type: String,
        required: true
    },
    templateContent: {
        type: String,
        required: false,
        default: ""
    },
});
const TemplatesModel = mongooseExport_1.mongooseInstance.model('templates', templateSchema);
exports.Templates = TemplatesModel;
//# sourceMappingURL=templates.js.map