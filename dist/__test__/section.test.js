"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const server_1 = require("../server");
describe("section", () => {
    describe("GET section", () => {
        describe("given sections do not exist yet", () => {
            it("responds with status code 404", async function () {
                const sectionCategory = "subjective";
                await supertest(server_1.app).get(`/sectionTemplate/${sectionCategory}`).expect(404);
            });
        });
    });
});
//# sourceMappingURL=section.test.js.map