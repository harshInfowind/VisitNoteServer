import { categoriesAllowed } from "constants/allowedSections";
import { getAllowedSectionCategoryPrompt, getInvalidSectionCategory } from "../constants/errorPromts";
export async function validSectionCheck(req: any, res: any, next: any){
    const { sectionCategory } = req.params;
    if (categoriesAllowed.includes(sectionCategory)) {
        return next();
    }else 
    return res.status(403).json({message: getInvalidSectionCategory(categoriesAllowed), error: getAllowedSectionCategoryPrompt(categoriesAllowed), supplement: `Section name passed: ${req.params.sectionCategory} | section names are case sensitive`})
}