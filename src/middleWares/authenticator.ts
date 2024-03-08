import * as jwt from "jsonwebtoken";
import "dotenv/config";

const noAuthHeaderPresent = "No Authorization Header Present in request"
const accessDenied = "Access-Denied";

export async function authenticateRequest(req: any, res: any, next: any){
    const token = req.headers('Authorization');
    if (!token) {
        return res.status(401).json({message: noAuthHeaderPresent, error: accessDenied})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as {userId: jwt.JwtPayload}
        req.userId = decoded?.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}