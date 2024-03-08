import { Router } from 'express';
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import { User } from '../models/user';
const route = Router();

const noSuchUserFound = "No User FoundWith the Provided Credentials";
const notFoundError = "User Not Found";
const invalidPassword = "Invalid Password";
const incorrectPasswordError = "Incorrect Password";
const authenticationFailedStatus = "Authentication Failed";
const internalServerErrorMessage = "Internal Server Error"
const internalServerError = "Something Went Wrong Please Contact Server Dev";


route.post("/register", async function(req: any, res: any){
    try{
        const { userName, password } = req.body;
    }catch(error){

    }
})

route.post("/logout", async function(){

});

route.post("/login", async function (req: any, res: any){
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({ userName });
        if (!user) {
            res.status(404).json({message: noSuchUserFound, error: notFoundError, status: authenticationFailedStatus});
        }
        const passwordToMatch = bcrypt.compare(password, user.password)
        if (!passwordToMatch) {
            res.status(401).json({message: invalidPassword, error: incorrectPasswordError, status: authenticationFailedStatus});
        }
        else {
            const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET_KEY, { expiresIn: '1h'});
            res.status(200).json({token})
        }
    }
    catch(error){
        res.status(500).json({message:internalServerErrorMessage, error: internalServerError, status: authenticationFailedStatus})
    }
})