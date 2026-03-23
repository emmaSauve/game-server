import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface jwtPayload {
    id: string;
    username: string;
}

declare global {
    namespace Express{
        interface Request{
            user?:jwtPayload
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
   try{
     const token = req.cookies.authToken;

        if (!token){
            throw new Error();
        }

    
        const decode = jwt.verify(token, process.env.PASSPORT_SECRET) as jwtPayload;
        req.user = decode;
        next();
        
    }catch (error){
        return res.status(401).json({error: 'Unauthorized'})
    }
}