const route = require("express").Router({});
import { BillingCodePlan } from "../models/billingCodePlan";
import { INTERNAL_SERVER_ERROR, NO_SECTION_DATA } from "../constants/errorPromts";

route.post("/billing-code-plan", async function (req: any, res: any) {
    try {
        const billingCodePlan = new BillingCodePlan(req.body)
        if (!billingCodePlan) return res.status(400).send("Invalid request payload!")
        await billingCodePlan.save()
        return res.status(201).json({ message: `Template Added Successfully`, billingCodePlan });
    } catch (error) {
        res.status(500).send(`Error creating dot phrase: ${error}`)
    }
});

route.get("/billing-code-plan", async function (req: any, res: any) {
    try {
        const billingCodePlan = await BillingCodePlan.find();
        if (billingCodePlan.length) res.status(200).json({ message: `Billing Code Plan Fetched Successfully`, billingCodePlan })
        else res.status(404).json({ message: NO_SECTION_DATA })
    } catch (err) {
        res.status(500).json({ message: INTERNAL_SERVER_ERROR, error: err.message })
    }
});

route.patch("/billing-code-plan/:id", async function (req: any, res: any) {
    const { id } = req.params;
    try {
        const isBillingCodePlanExist = await BillingCodePlan.findById(id);
        if (!isBillingCodePlanExist) return res.status(404).json({ message: NO_SECTION_DATA })
        const isBillingCodePlanUpdate = await BillingCodePlan.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        if (isBillingCodePlanUpdate) res.status(200).json({ message: `Template Updated Successfully`, isBillingCodePlanUpdate })
    } catch (err) {
        res.status(500).json({ message: INTERNAL_SERVER_ERROR, error: err.message })
    }
});

route.delete("/billing-code-plan/:id", async function (req: any, res: any) {
    const { id } = req.params;
    try {
        const isBillingCodePlanExist = await BillingCodePlan.findById(id);
        if (!isBillingCodePlanExist) return res.status(404).json({ message: NO_SECTION_DATA })
        const isBillingCodePlanDelete = await BillingCodePlan.findByIdAndDelete({ _id: id });
        if (isBillingCodePlanDelete) res.status(200).json({ message: `Template Deleted Successfully`, isBillingCodePlanDelete })
    } catch (err) {
        res.status(500).json({ message: INTERNAL_SERVER_ERROR, error: err.message })
    }
});



export const billingCodePlanRoute = route;