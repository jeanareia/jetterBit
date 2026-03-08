function authMiddleware(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    console.log("apiKey --> " + apiKey);

    if(!apiKey || apiKey !== process.env.API_KEY){
        return res.status(401).json({ message: "Access denied. Invalid API Key." });
    }

    next();
}

module.exports = authMiddleware;