import { mongooseInstance } from "./mongooseExport";
const sectionCategorySchema = new mongooseInstance.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    }
});
export const SectionCategory = mongooseInstance.model("sectionCategory", sectionCategorySchema)