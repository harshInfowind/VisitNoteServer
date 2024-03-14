"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user_1 = require("../models/user");
const route = (0, express_1.Router)();
const noSuchUserFound = "No User FoundWith the Provided Credentials";
const notFoundError = "User Not Found";
const invalidPassword = "Invalid Password";
const incorrectPasswordError = "Incorrect Password";
const authenticationFailedStatus = "Authentication Failed";
const internalServerErrorMessage = "Internal Server Error";
const internalServerError = "Something Went Wrong Please Contact Server Dev";
route.post("/register", async function (req, res) {
    try {
        const { userName, password } = req.body;
    }
    catch (error) {
    }
});
route.post("/logout", async function () {
});
route.post("/login", async function (req, res) {
    const { userName, password } = req.body;
    try {
        const user = await user_1.User.findOne({ userName });
        if (!user) {
            res.status(404).json({ message: noSuchUserFound, error: notFoundError, status: authenticationFailedStatus });
        }
        const passwordToMatch = bcrypt.compare(password, user.password);
        if (!passwordToMatch) {
            res.status(401).json({ message: invalidPassword, error: incorrectPasswordError, status: authenticationFailedStatus });
        }
        else {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ token });
        }
    }
    catch (error) {
        res.status(500).json({ message: internalServerErrorMessage, error: internalServerError, status: authenticationFailedStatus });
    }
});
//# sourceMappingURL=login.js.map