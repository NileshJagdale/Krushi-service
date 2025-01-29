const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {

    const token = req?.headers?.authorization?.split(' ')[1];

    if (!token) {
        return res.sendStatus(403);
    }

    jwt.verify(token, 'property', (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateJWT;