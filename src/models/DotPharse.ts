import { mongooseInstance } from "./mongooseExport";

const DotPhraseSchema = new mongooseInstance.Schema({
    templateName: {
        type: String,
        required: true,
    },
    dotPhrase: {
        type: String,
        required: true,
    },
    dotPhraseTemplate: {
        type: String,
        required: true,
    },
})

const DotPhraseModel = mongooseInstance.model("dotphrase", DotPhraseSchema)
export const DotPhrase = DotPhraseModel
