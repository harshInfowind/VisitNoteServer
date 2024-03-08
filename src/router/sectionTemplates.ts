const route = require("express").Router({});
import { Templates } from "../models/templates";
import { Sections } from "../models/sections";
import { keywordsModule } from "../models/keywords";
const serverErrorMessage = "Internal Server Error"
const noSectionDataFound = "No Section Data Available"

/* 
    API to get A Single Section Data based on its sectionCategory / Category
*/
route.get("/sections", async function(req: any, res: any){
    try{
        const allSections = await Sections.find();
        if (allSections){
            res.status(200).json(allSections)
            }
        else res.status(404).json({message: noSectionDataFound})
        
    }catch(err) {
        res.status(400).json({message: serverErrorMessage, error: err.message})
    }
})


const newGeneratedSection = "New Section Data Created";
const categoriesAllowed = ["Subjective", "Objective", "Assessment", "Plan"];
const invalidSectionCategory = `Invalid Section Category Passed as parameter\n Allowed Categories: ${categoriesAllowed}`;
const invalidSectionCategoryError = `Allowed Section Categories: ${categoriesAllowed}`

route.get("/:sectionCategory/", async function (req: any, res: any){
    const category = req.params.sectionCategory;
    if (categoriesAllowed.includes(category)) {
        try{
            const sectionCollectionQuery = {category: category};
            let section = await Sections.findOne(sectionCollectionQuery);
            if (!Object.keys(section || {}).length) {
                section = new Sections({
                    category: category,
                });
                try{
                    await section.save();
                }catch(error){
                    console.log("\n*************************", error, error.message, "\n*************************");
                    return res.status(500).json({message: error.message, error})
                }
                return res.status(200).json({message: newGeneratedSection, section})
            }else {
                return res.status(200).json(section)
            }
        }
        catch(err){
            return res.status(400).json({message: serverErrorMessage, error: err.message})
        }
    }else {
        return res.status(403).json({message: invalidSectionCategory, error: invalidSectionCategoryError, supplement: `Section name passed: ${req.params.sectionCategory} | section names are case sensitive`})
    }
});


/* API to fetch A Particular Template of a perticular section
    @params required: templateId
    @params required: sectionCategory
*/
route.get("/:sectionCategory/:templateId", async function (req: any, res: any){
    const { sectionCategory, templateId } = req.params;
    try{
        const template = Templates.findOne({id: templateId, category: sectionCategory});
        res.status(200).json(template)
    }catch(err){
        res.status(400).json({message: serverErrorMessage, error: err.message})
    }
});

/* API to Add Template to particular section
    @@params required:  sectionCaategory
    @@params required:  sectionId
*/
route.get("/getAllTemplates", async function (req: any, res: any){
    try{
        const allTemplates = await Templates.find() || [];
        res.status(200).json(allTemplates)        
    }catch(error){
        res.status(400).json({message: "Some error occoured while retrieving all templates", error})
    }
})


route.post("/addTemplate/:sectionCategory/",  async function (req: any, res: any){
    const { sectionCategory } = req.params;
    let positiveResString = "";
    if (categoriesAllowed.includes(sectionCategory)) {
        /* 
            * Check if section exists
         */
        let section = {} as any;
        try{
            section = await Sections.findOne({category: sectionCategory});
            if (!Object.keys(section).length || !section)
            throw Error("No Such Section present")
        }
        catch(err) {
            return res.status(404).json({message: 'No Such Section or Category Found', error: err.message});
        }
            if (Object.keys(section).length) {
                const templateData = req.body;
                const templateDocument = new Templates({
                    title: templateData.title,
                    category: {
                        categoryId: section._id,
                        categoryName: section.category
                    },
                    templateContent: templateData.templateContent,
                });

                try{
                    for (let i = 0; i< templateData.keywords.length ;i++) {
                        let keyword = await keywordsModule.Keywords.findOne({
                            subject: templateData.keywords[i]
                        }) ||  new keywordsModule.Keywords({
                            template:{
                                templateId: templateDocument._id,
                                templateName: templateDocument.title
                            },
                            subject: templateData.keywords[i],
                            editable: false
                        });
                        templateDocument.keywords.push({
                            keywordId: keyword._id,
                            keywordSubject: keyword.subject,
                        })
                        await keyword.save();
                    }
                    positiveResString += " \n keywords saved";

                }
                catch(keywordsDocCreationError) {
                    return res.status(500).json({message: 'error in saving keywords', error: keywordsDocCreationError})
                }
                
                const templatesToUpdate = [...(section.templates || []), ...([{
                    template: templateDocument._id,
                    title: templateDocument.title,
                    keyowrds: templateDocument.keywords
                }])]
                positiveResString += " \n Section details Updated";
                try {
                    try {
                        await templateDocument.save();
                        positiveResString += " \n Template Saved"
                    }catch(error){
                        return res.status(500).json({message: `Error in saving Template: ${templateData.title}`, error});
                    }
                    await Sections.updateOne({category: sectionCategory, _id: section._id}, {$set: {templates: templatesToUpdate}})
                    return res.status(201).json({message: positiveResString})
                }
                catch(err){
                   return res.status(400).json({message: `Error in Updating Templates for Section:${sectionCategory}`, error: err.message})
                }

            }
    }
    else {
        res.status(403).json({message: invalidSectionCategory, error: invalidSectionCategoryError, supplement: `Section name passed: ${sectionCategory} | section names are case sensitive`})
    }
});

export const sectionTemplate = route;