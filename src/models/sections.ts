import { mongooseInstance } from "./mongooseExport";

const sectionSchema = new mongooseInstance.Schema({
    category: {
        type: String,
        required: true,
    },
    templates:{
        type: [{
            templateId:{
                type: String,
            },
            title: {
                type: String,
            },
        }],
        default: []
    }
})
const SectionsModel = mongooseInstance.model('sections', sectionSchema);

export const Sections = SectionsModel;