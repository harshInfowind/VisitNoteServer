import { mongooseInstance } from "./mongooseExport";
import { keywordsModule } from "./keywords";

const templateSchema = new mongooseInstance.Schema({
    category: {
        categoryId: {
            type: mongooseInstance.Schema.ObjectId,
            required: true, 
            unique: true
        },
        categoryName: {
            type: String,
            required: true, 
            unique: true
        }
    },
    title: {
         type: String,
         required: true
    },
    templateContent:{
        type: String,
        required: false,
        default: ""
    },
    keywords: [{
        keywordId: String,
        keywordSubject: String
    }]
})

const TemplatesModel = mongooseInstance.model('templates', templateSchema);

export const Templates = TemplatesModel;