import jwt from 'jsonwebtoken'
import { createError } from '../ultis/error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError(401,"You are not authorized"))
    }

    jwt.verify(token, process.env.JWT, (err, decoded) => {
        if(err)  return next(createError(403, "Token is not valid"))
        req.userId = decoded.id;
        req.isAdmin = decoded.isAdmin;
        next()
    })
}

export const verifyUser = (req, res, next) =>{
    verifyToken(req, res, next, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            if (err) return next(createError(403, "You are not authorized!"))
        }
    })
}

export const verifyAdmin = (req, res, next) =>{
    verifyToken(req, res, next, ()=>{
        if(req.user.isAdmin) {
            next()
        } else {
            if (err) return next(createError(403, "You are not authorized!"))
        }
    })
}