const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.verifyToken
    if(authHeader){
        jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
            if(err) res.status(403).json("Token is very uncool");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("Nope");
    }
};

const verifyTokenAndAuth = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("uncooooool");
        }
    });
};

module.exports = {verifyToken, verifyTokenAndAuth}