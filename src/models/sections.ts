import { mongooseInstance } from "./mongooseExport";
import { keywordsModule } from "./keywords";

const sectionSchema = new mongooseInstance.Schema({
    category: {
        type: String,
        required: true,
    },
    templates:{
        type: [{
            templateId:{
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true,
            },
            keywords:[keywordsModule.keywordsSchema]
        }],
        require: false,
        default: []
    }
})
const SectionsModel = mongooseInstance.model('sections', sectionSchema);

export const Sections = SectionsModel;