import { mongooseInstance } from "./mongooseExport";

const user = new mongooseInstance.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true,
    }
});
export const User = mongooseInstance.model("User", user)
