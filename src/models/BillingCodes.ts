import { mongooseInstance } from "./mongooseExport";

const BillingCodeSchema = new mongooseInstance.Schema({
    billingCodes: {
        type: String,
        required: true,
    },
})

const BillingCodeModel = mongooseInstance.model("billingcode", BillingCodeSchema)
export const BillingCode = BillingCodeModel
