import { mongooseInstance } from "./mongooseExport";
import { keywordsModule } from "./keywords";

const templateSchema = new mongooseInstance.Schema({
    category: {
        categoryId: {
            type: mongooseInstance.Schema.ObjectId,
            required: true, 
            unique: false
        },
        categoryName: {
            type: String,
            required: true, 
            unique: false
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
})

const TemplatesModel = mongooseInstance.model('templates', templateSchema);

export const Templates = TemplatesModel;