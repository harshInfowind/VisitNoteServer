
export const INTERNAL_SERVER_ERROR = "Internal Server Error"
export const NO_SECTION_DATA = "No Section Data Available"
export const getInvalidSectionCategory= (categoriesAllowed: Array<string>) => `Invalid Section Category Passed as parameter | Allowed Categories: ${categoriesAllowed}`;
export const getAllowedSectionCategoryPrompt = (categoriesAllowed: Array<string>) => `Allowed Section Categories: ${categoriesAllowed}`