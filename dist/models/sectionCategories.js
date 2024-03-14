"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionCategory = void 0;
const mongooseExport_1 = require("./mongooseExport");
const sectionCategorySchema = new mongooseExport_1.mongooseInstance.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    }
});
exports.SectionCategory = mongooseExport_1.mongooseInstance.model("sectionCategory", sectionCategorySchema);
//# sourceMappingURL=sectionCategories.js.map