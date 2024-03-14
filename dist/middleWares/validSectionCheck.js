"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validSectionCheck = void 0;
const allowedSections_1 = require("constants/allowedSections");
const errorPromts_1 = require("../constants/errorPromts");
async function validSectionCheck(req, res, next) {
    const { sectionCategory } = req.params;
    if (allowedSections_1.categoriesAllowed.includes(sectionCategory)) {
        return next();
    }
    else
        return res.status(403).json({ message: (0, errorPromts_1.getInvalidSectionCategory)(allowedSections_1.categoriesAllowed), error: (0, errorPromts_1.getAllowedSectionCategoryPrompt)(allowedSections_1.categoriesAllowed), supplement: `Section name passed: ${req.params.sectionCategory} | section names are case sensitive` });
}
exports.validSectionCheck = validSectionCheck;
//# sourceMappingURL=validSectionCheck.js.map