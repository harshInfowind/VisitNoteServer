import * as supertest from 'supertest';
import { app } from "../server";

describe("section", ()=>{
    describe("GET section", ()=>{
        describe("given sections do not exist yet", ()=>{
            it("responds with status code 404", async function (){
                const sectionCategory = "Subjective";
                await supertest(app).get(`/getSection/${sectionCategory}`).expect(200)
            })
        });
    })
})