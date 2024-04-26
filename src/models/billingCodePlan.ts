import { mongooseInstance } from "./mongooseExport";

const BillingCodePlanSchema = new mongooseInstance.Schema({
    templateName: {
        type: String,
        required: true,
    },
    templateText: {
        type: String,
        required: true,
    },
    billingCodes: {
        type: Array,
        required: true,
    },
})

const BillingCodePlanModel = mongooseInstance.model("billingcodeplan", BillingCodePlanSchema)
export const BillingCodePlan = BillingCodePlanModel
