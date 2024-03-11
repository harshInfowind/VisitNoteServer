import "dotenv/config";
import * as express from "express";
import * as http from "http";
import { INITIAL_CONNECTION_ESTABLISHED } from "./helpers/ENUM_EVENTS";
import { connectionModule } from "./database/config";
import { sectionTemplate } from "./router/sectionTemplates";
import * as cors from "cors";
const port = process.env.PORT
export const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cors({ 
    origin:"*",
    credentials: true
}));


connectionModule()
.then((res)=>{
    if (res === INITIAL_CONNECTION_ESTABLISHED) {
        app.use("/", sectionTemplate);
        const server = http.createServer(app);
        server.listen(port, async ()=> console.log(`SERVER RUNNING AT PORT::${port}`))        
    }
})
.catch((err)=>{
    console.log("CONNECTION Related Issue", err)
})
