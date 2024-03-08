import { mongooseInstance } from "./mongooseExport";

const keywordsSchema = new mongooseInstance.Schema({
    subject: {
        type: String,
        required: true,
    },
    template: {
        templateId: {
            type: mongooseInstance.Schema.ObjectId,
            required: false,
        },
        templateName: {
            type: String,
            required: false,
        },
    },
    editable: {
        type: Boolean,
        required: false,
        default: true
    }
})

const KeywordsModel = mongooseInstance.model("keywords", keywordsSchema)

export const keywordsModule = {
    keywordsSchema,
    Keywords: KeywordsModel
};