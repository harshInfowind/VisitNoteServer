"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllowedSectionCategoryPrompt = exports.getInvalidSectionCategory = exports.NO_SECTION_DATA = exports.INTERNAL_SERVER_ERROR = void 0;
exports.INTERNAL_SERVER_ERROR = "Internal Server Error";
exports.NO_SECTION_DATA = "No Section Data Available";
const getInvalidSectionCategory = (categoriesAllowed) => `Invalid Section Category Passed as parameter | Allowed Categories: ${categoriesAllowed}`;
exports.getInvalidSectionCategory = getInvalidSectionCategory;
const getAllowedSectionCategoryPrompt = (categoriesAllowed) => `Allowed Section Categories: ${categoriesAllowed}`;
exports.getAllowedSectionCategoryPrompt = getAllowedSectionCategoryPrompt;
//# sourceMappingURL=errorPromts.js.map