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
            },
            required: false,
            default:  null,
        }
    }
});

const MasterTemplateModel = mongooseInstance.model("masterTemplate", masterTemplateSchema);
export const MasterTemplate = MasterTemplateModel