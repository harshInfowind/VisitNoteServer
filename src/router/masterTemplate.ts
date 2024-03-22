const route = require("express").Router({});
import { MasterTemplate } from "../models/masterTemplate";
import { INTERNAL_SERVER_ERROR, NO_SECTION_DATA, getAllowedSectionCategoryPrompt, getInvalidSectionCategory } from "../constants/errorPromts";
import { categoriesAllowed } from "../constants/allowedSections";


route.get("/getMasterTemplates", async function (req: any, res: any){
    try{
        const masterTemplates = await MasterTemplate.find() || [];
        return res.status(200).json(masterTemplates)
    }
    catch(error){
        return res.status(400).json({message:INTERNAL_SERVER_ERROR, error: error.message})
    }
})

route.get("/getMasterTemplate/:templateId", async function (req: any, res: any){
    const { templateId } = req.params;
    try{
        const masterTemplate = await MasterTemplate.findOne({_id: templateId}) || {};
        if (Object.keys(masterTemplate).length) return res.status(200).json(masterTemplate)
        else throw new Error("No master template found");
    }catch(error){
        return res.status(404).json({message: "No Master Template Found", error: `No Master template with templateId: ${templateId} Found`})
    }
});

route.post("/addMasterTemplate", async function (req: any, res: any){
    const masterTemplateData = req.body;
    const sectionKeys = Object.keys(masterTemplateData.sections);
    let invalidTitle = false;
    let invalidSectionKeySupplied = false;

    try {
        if (!masterTemplateData.title || masterTemplateData.title === '') {
            invalidTitle = true;
            throw new Error(`title for master template creation is required`)
        }
        const masterTemplate = new MasterTemplate({
            title: masterTemplateData.title,
            sections: {
                Subjective:  "",
                Objective:  "",
                Assessment: "",
                Plan:  "",
            },
            ...(masterTemplateData.uniqueMeta ? {uniqueMeta: masterTemplateData.uniqueMeta} : {}),
        });

        for (let i = 0; i< sectionKeys.length; i++){
            if (!categoriesAllowed.includes((sectionKeys[i]))) {
                invalidSectionKeySupplied = true;
                throw new Error(`Invalid Section key supplied: ${sectionKeys[i]}`);
            }
             masterTemplate.set({
                sections:{
                    ...masterTemplate.sections,
                    [`${sectionKeys[i]}`]: masterTemplateData.sections?.[sectionKeys[i]],
                }
            })
        }
        try {
            await masterTemplate.save();
            return res.status(201).json({message: 'master Templated Saved !', supplement: `master Template saved with Id: ${masterTemplate._id}`})
        }
        catch(error){
            return res.status(500).json({message: INTERNAL_SERVER_ERROR, error: error.message})
        }
    }
    catch(error){
        if (invalidTitle) return res.status(400).json({message: "invalid Title supplied for the template", error: error.message})
        if (invalidSectionKeySupplied) return res.status(400).json({message: "Invalid SectionKey supplied for template template", error: error.message})
        return res.status(500).json({message: INTERNAL_SERVER_ERROR, error: error.message});
    }
});


route.patch("/editMasterTemplate/:templateId", async function (req: any, res: any){
    const { templateId } = req.params;
    const dataToUpdate = req.body;
    try{
        const masterTemplateToUpdate = await MasterTemplate.findOne({_id: templateId});
        if (!masterTemplateToUpdate) throw new Error(`MAster template with Id: ${templateId} doesn't exist`);
        if (dataToUpdate.title && dataToUpdate.title !== masterTemplateToUpdate.title) {
            masterTemplateToUpdate.set({
                title: dataToUpdate.title,
            });
            masterTemplateToUpdate.set({
                uniqueMeta: {
                    originalTemplate: dataToUpdate.uniqueMeta?.originalTemplate || true,
                    parentTemplate: dataToUpdate.uniqueMeta?.parentTemplate || null
                }
            })
        }
        if (Object.keys(dataToUpdate.sections || {}).length) {
            const sectionKeys = Object.keys(dataToUpdate.sections);
            for (let i = 0; i< sectionKeys.length; i++){
                if (!categoriesAllowed.includes((sectionKeys[i]))) {
                    throw new Error(`Invalid Section key supplied: ${sectionKeys[i]}`);
                }
                 masterTemplateToUpdate.set({
                    sections: {
                        ...masterTemplateToUpdate.sections,
                        [`${sectionKeys[i]}`]: dataToUpdate.sections?.[sectionKeys[i]],
                    }
                 })
            }
        }
        await masterTemplateToUpdate.save();
        return res.status(201).json({message: "master template updated!"})
    }catch(error){
        return res.status(400).json({message: 'Unable to update Master template', error: error.message})
    }
});


route.delete("/deleteMasterTemplate/:templateId", async function (req: any, res: any){
    const { templateId: masterTemplateIdToDelete } = req.params;
    try{
        const masterTemplateFound  = await MasterTemplate.findOneAndDelete({_id: masterTemplateIdToDelete});
        if (!masterTemplateFound) throw new Error(`No master Template Available with the provided template Id: ${masterTemplateIdToDelete}`)
        return res.status(201).json({message: 'Master Template removed Successfully'})
    }catch(error){
        return res.status(400).json({error: error.message})
    }
});

export const masterTemplateRoutes = route