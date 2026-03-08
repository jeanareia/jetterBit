const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log("authHeader --> " + authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log("token --> " + token);

    if(!token || token !== process.env.API_KEY){
        return res.status(401).json({ message: "Access denied. Invalid API Key." });
    }

    next();
}

module.exports = authMiddleware;