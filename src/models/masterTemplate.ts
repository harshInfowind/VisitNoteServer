import { mongooseInstance } from "./mongooseExport";

const masterTemplateSchema = new mongooseInstance.Schema({
    title:{
        type: String,
        required: true
    },
    sections:{
        Subjective:{
             type: String
        },
        Objective:{
                type: String
               
        },
        Assessment:{
            type: String
        },
        Plan:{
                type: String
        },
    }
});

const MasterTemplateModel = mongooseInstance.model("masterTemplate", masterTemplateSchema);
export const MasterTemplate = MasterTemplateModel