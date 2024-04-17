const route = require("express").Router({});
import { INTERNAL_SERVER_ERROR, NO_SECTION_DATA } from "../constants/errorPromts";
import { DotPhrase } from "../models/DotPharse";

route.post("/dotphrase", async function (req: any, res: any) {
    try {
        const dotPhrase = new DotPhrase(req.body)
        if (!dotPhrase) return res.status(400).send("Invalid request payload!")
        await dotPhrase.save()
        return res.status(201).json({ message: `Template Added Successfully`, dotPhrase });
    } catch (error) {
        res.status(500).send(`Error creating dot phrase: ${error}`)
    }
});

route.get("/dotphrase", async function (req: any, res: any) {
    try {
        const dotPhrase = await DotPhrase.find();
        if (dotPhrase.length) res.status(200).json({ message: `Dot Phrase Fetched Successfully`, dotPhrase })
        else res.status(404).json({ message: NO_SECTION_DATA })
    } catch (err) {
        res.status(500).json({ message: INTERNAL_SERVER_ERROR, error: err.message })
    }
});

route.patch("/dotphrase/:id", async function (req: any, res: any) {
    const { id } = req.params;
    try {
        const idDotPhraseExist = await DotPhrase.findById(id);
        if (!idDotPhraseExist) return res.status(404).json({ message: NO_SECTION_DATA })
        const isDotPhraseUpdate = await DotPhrase.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        if (isDotPhraseUpdate) res.status(200).json({ message: `Template Updated Successfully`, isDotPhraseUpdate })
    } catch (err) {
        res.status(500).json({ message: INTERNAL_SERVER_ERROR, error: err.message })
    }
});

route.delete("/dotphrase/:id", async function (req: any, res: any) {
    const { id } = req.params;
    try {
        const idDotPhraseExist = await DotPhrase.findById(id);
        if (!idDotPhraseExist) return res.status(404).json({ message: NO_SECTION_DATA })
        const isDotPhraseUpdate = await DotPhrase.findByIdAndDelete({ _id: id });
        if (isDotPhraseUpdate) res.status(200).json({ message: `Template Deleted Successfully`, isDotPhraseUpdate })
    } catch (err) {
        res.status(500).json({ message: INTERNAL_SERVER_ERROR, error: err.message })
    }
});



export const dotPhraseRoute = route;