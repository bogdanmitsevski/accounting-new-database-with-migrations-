const jwt = require('jsonwebtoken');

export default function (req:any, res:any, next:any) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: "Authorization failed. To make some request, you need to be authorized in the system"});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({message: "Authorization failed"});
    }
};