"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keywordsModule = void 0;
const mongooseExport_1 = require("./mongooseExport");
const keywordsSchema = new mongooseExport_1.mongooseInstance.Schema({
    subject: {
        type: String,
        required: true,
    },
    template: {
        templateId: {
            type: mongooseExport_1.mongooseInstance.Schema.ObjectId,
            required: false,
        },
        templateName: {
            type: String,
            required: false,
        },
    },
    editable: {
        type: Boolean,
        required: false,
        default: true
    }
});
const KeywordsModel = mongooseExport_1.mongooseInstance.model("keywords", keywordsSchema);
exports.keywordsModule = {
    keywordsSchema,
    Keywords: KeywordsModel
};
//# sourceMappingURL=keywords.js.map