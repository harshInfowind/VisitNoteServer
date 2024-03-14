"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sectionTemplate = void 0;
const route = require("express").Router({});
const templates_1 = require("../models/templates");
const sections_1 = require("../models/sections");
const keywords_1 = require("../models/keywords");
const errorPromts_1 = require("../constants/errorPromts");
const allowedSections_1 = require("../constants/allowedSections");
const newGeneratedSection = "New Section Data Created";
/*
    API to get A Single Section Data based on its sectionCategory / Category
*/
route.get("/sections", async function (req, res) {
    try {
        const allSections = await sections_1.Sections.find();
        if (allSections) {
            res.status(200).json(allSections);
        }
        else
            res.status(404).json({ message: errorPromts_1.NO_SECTION_DATA });
    }
    catch (err) {
        res.status(400).json({ message: errorPromts_1.INTERNAL_SERVER_ERROR, error: err.message });
    }
});
route.get("/getSection/:sectionCategory/", async function (req, res) {
    const category = req.params.sectionCategory;
    if (allowedSections_1.categoriesAllowed.includes(category)) {
        try {
            const sectionCollectionQuery = { category: category };
            let section = await sections_1.Sections.findOne(sectionCollectionQuery);
            if (!Object.keys(section || {}).length) {
                section = new sections_1.Sections({
                    category: category,
                });
                try {
                    await section.save();
                }
                catch (error) {
                    return res.status(500).json({ message: error.message, error });
                }
                return res.status(200).json({ message: newGeneratedSection, section });
            }
            else {
                return res.status(200).json(section);
            }
        }
        catch (err) {
            return res.status(400).json({ message: errorPromts_1.INTERNAL_SERVER_ERROR, error: err.message });
        }
    }
});
/* API to fetch A Particular Template of a perticular section
    @params required: templateId
    @params required: sectionCategory
*/
route.get("/getTemplate/:templateId", async function (req, res) {
    const { templateId } = req.params;
    try {
        const template = await templates_1.Templates.findOne({ _id: `${templateId}` });
        return res.status(200).json({ template });
    }
    catch (err) {
        return res.status(500).json({ message: errorPromts_1.INTERNAL_SERVER_ERROR });
    }
});
route.post("/addTemplate/:sectionCategory/", async function (req, res) {
    const { sectionCategory } = req.params;
    let positiveResString = "";
    if (allowedSections_1.categoriesAllowed.includes(sectionCategory)) {
        /*
            * Check if section exists
         */
        let section = {};
        try {
            section = await sections_1.Sections.findOne({ category: sectionCategory });
            if (!Object.keys(section).length || !section)
                throw Error("No Such Section present");
        }
        catch (err) {
            return res.status(404).json({ message: 'No Such Section or Category Found', error: err.message });
        }
        if (Object.keys(section).length) {
            const templateData = req.body;
            const templateDocument = new templates_1.Templates({
                title: templateData.title,
                category: {
                    categoryId: section._id,
                    categoryName: section.category
                },
                templateContent: templateData.templateContent,
            });
            const templatesToUpdate = [...(section.templates || []), ...([{
                        templateId: templateDocument._id,
                        title: templateDocument.title,
                    }])];
            positiveResString += "Section details Updated";
            try {
                try {
                    await templateDocument.save();
                    positiveResString += " \n Template Saved";
                }
                catch (error) {
                    return res.status(500).json({ message: `Error in saving Template: ${templateDocument.title}`, error: error.message });
                }
                await sections_1.Sections.updateOne({ category: sectionCategory, _id: section._id }, { $set: { templates: templatesToUpdate } });
                positiveResString += ` Template details: templateSaved: ${templateDocument.title} | TemplateId: ${templateDocument._id}`;
                return res.status(201).json({ message: positiveResString });
            }
            catch (err) {
                return res.status(400).json({ message: `Error in Updating Templates for Section:${sectionCategory}`, error: err.message });
            }
        }
    }
    else {
        res.status(403).json({ message: (0, errorPromts_1.getInvalidSectionCategory)(allowedSections_1.categoriesAllowed), error: (0, errorPromts_1.getAllowedSectionCategoryPrompt)(allowedSections_1.categoriesAllowed), supplement: `Section name passed: ${sectionCategory} | section names are case sensitive` });
    }
});
/*
    API To Edit existing template:
    
*/
route.patch("/editSectionTemplate/:sectionCategory/:templateId", async function (req, res) {
    if (allowedSections_1.categoriesAllowed.includes(req.params.sectionCategory)) {
        const { templateId, sectionCategory } = req.params;
        let templateFound;
        try {
            templateFound = await templates_1.Templates.findOne({ _id: templateId });
            if (!templateFound || !Object.keys(templateFound).length)
                throw Error("Non Existing Template attempted to Edit");
        }
        catch (error) {
            return res.status(404).json({ message: 'non existing template', error: error.message });
        }
        const keysToUpdate = {
            ...(req.body.title ? { title: req.body.title } : {}),
            ...(req.body.templateContent ? { templateContent: req.body.templateContent } : {}),
        };
        if (Object.keys(keysToUpdate).length) {
            try {
                const section = await sections_1.Sections.findOne({ category: sectionCategory });
                if (!section || !Object.keys(section).length)
                    throw Error(`Cannot find any section with category: ${sectionCategory}`);
                const templateIndexToUpdate = section.templates.findIndex(t => t.templateId === templateId);
                section.templates[templateIndexToUpdate] = {
                    templateId: templateId,
                    ...(keysToUpdate.title ? { title: keysToUpdate.title } : { title: section.templates[templateIndexToUpdate].title }),
                };
                await templates_1.Templates.updateOne({ _id: templateId }, { $set: keysToUpdate });
                await section.save();
                return res.status(201).json({ message: `Template Updated Successfully` });
            }
            catch (error) {
                return res.status(500).json({ message: "Error in updating template", error: error.message });
            }
        }
        else {
            return res.status(200).json({ message: "No data to update" });
        }
    }
    else {
        return res.status(403).json({ message: (0, errorPromts_1.getInvalidSectionCategory)(allowedSections_1.categoriesAllowed), error: (0, errorPromts_1.getAllowedSectionCategoryPrompt)(allowedSections_1.categoriesAllowed), supplement: `Section name passed: ${req.params.sectionCategory} | section names are case sensitive` });
    }
});
/*
    * Get all keywords
*/
route.get("/getKeywords", async function (req, res) {
    try {
        const { Keywords } = keywords_1.keywordsModule;
        const allKeywords = await Keywords.find({});
        return res.status(200).json(allKeywords);
    }
    catch (error) {
        return res.status(500).json({ message: errorPromts_1.INTERNAL_SERVER_ERROR, error: error.message });
    }
});
route.delete("/removeTemplate/:sectionCategory/:templateId", async function (req, res) {
    if (allowedSections_1.categoriesAllowed.includes(req.params.sectionCategory)) {
        try {
            const section = await sections_1.Sections.findOne({ category: req.params.sectionCategory });
            const templateIndexToDel = section.templates.findIndex(t => t.templateId === req.params.templateId);
            section.templates.splice(templateIndexToDel, 1);
            await section.save();
            await templates_1.Templates.findOneAndDelete({ _id: req.params.templateId });
            return res.status(200).json({ message: `Template Deleted, section Updated: ${req.params.sectionCategory}` });
        }
        catch (error) {
            return res.status(500).json({ message: errorPromts_1.INTERNAL_SERVER_ERROR, error: error.message });
        }
    }
    else {
        return res.status(403).json({ message: (0, errorPromts_1.getInvalidSectionCategory)(allowedSections_1.categoriesAllowed), error: (0, errorPromts_1.getAllowedSectionCategoryPrompt)(allowedSections_1.categoriesAllowed), supplement: `Section name passed: ${req.params.sectionCategory} | section names are case sensitive` });
    }
});
exports.sectionTemplate = route;
//# sourceMappingURL=sectionTemplates.js.map