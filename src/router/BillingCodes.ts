const route = require("express").Router({});
import { BillingCode } from "../models/BillingCodes";
import { INTERNAL_SERVER_ERROR, NO_SECTION_DATA } from "../constants/errorPromts";
import { DotPhrase } from "../models/DotPharse";

route.post("/billing-code", async function (req: any, res: any) {
    try {
        const billingCode = new BillingCode(req.body)
        if (!billingCode) return res.status(400).send("Invalid request payload!")
        await billingCode.save()
        return res.status(201).json({ message: `Template Added Successfully`, billingCode });
    } catch (error) {
        res.status(500).send(`Error creating dot phrase: ${error}`)
    }
});

route.get("/billing-code", async function (req: any, res: any) {
    try {
        const billingCode = await BillingCode.find();
        if (billingCode.length) res.status(200).json({ message: `CPT code Fetched Successfully`, billingCode })
        else res.status(404).json({ message: NO_SECTION_DATA })
    } catch (err) {
        res.status(500).json({ message: INTERNAL_SERVER_ERROR, error: err.message })
    }
});

export const billingCodeRoute = route;