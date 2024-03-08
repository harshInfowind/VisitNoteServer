import { INITIAL_CONNECTION_ESTABLISHED } from "../helpers/ENUM_EVENTS";
import { mongooseInstance } from "../models/mongooseExport";
import "dotenv/config";

function connection(){

    const databaseTestUrl = process.env.DB_TEST_URL as string;
    
    return new Promise(async (res, rej)=>{
        try{
            await mongooseInstance.connect(databaseTestUrl);
            res(INITIAL_CONNECTION_ESTABLISHED)
        }
        catch(error){
            rej(Error(`Error in connection establishment\n ${error}`))
        }
    })
}

export const connectionModule = connection;

