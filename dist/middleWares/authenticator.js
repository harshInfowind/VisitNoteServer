"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRequest = void 0;
const jwt = require("jsonwebtoken");
require("dotenv/config");
const noAuthHeaderPresent = "No Authorization Header Present in request";
const accessDenied = "Access-Denied";
async function authenticateRequest(req, res, next) {
    const token = req.headers('Authorization');
    if (!token) {
        return res.status(401).json({ message: noAuthHeaderPresent, error: accessDenied });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded?.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}
exports.authenticateRequest = authenticateRequest;
//# sourceMappingURL=authenticator.js.map