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
    uniqueMeta: {
        originalTemplate: {
            type: Boolean,
            required: false,
            default: true
        },
        parentTemplate: {
            type: {
                templateId: {
                    type: mongooseInstance.Schema.ObjectId,
                    unique: true,
                    required: false,
                    default: null,
                },
                title:{
                    type: String,
                    required: false,
                    unique: false,
                    default: "",
                },
                category: {
                    type: {
                        categoryName: {
                            type: String,
                            unique:false,
                            default:"",
                            required: false
                        },
                        categoryId: {
                            type: mongooseInstance.Schema.ObjectId,
                            unique: true,
                            default: null,
                            required: false
                        },
                    },
                    required: false,
                    unique: false,
                    default: {}
                }
            },
            required: false,
            default:  null,
        }
    }
})

const TemplatesModel = mongooseInstance.model('templates', templateSchema);

export const Templates = TemplatesModel;