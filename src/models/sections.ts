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
            keywords:[{
                keywordId: String,
                keywordSubject: String
            }]
        }],
        default: []
    }
})
const SectionsModel = mongooseInstance.model('sections', sectionSchema);

export const Sections = SectionsModel;