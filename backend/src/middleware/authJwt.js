require('dotenv').config()
const jwt = require("jsonwebtoken");
const User = require("../models/User")

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {

        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "No autorizado!"
            });
        }

        req.userId = decoded.id;
        next();
    });
};
isAdmin = (req, res, next) => {

    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};
module.exports = authJwt;
