
const ROLES = require("../models/Role")
const User = require("../models/User")

checkDuplicateUsername = (req, res, next) => {

    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
        next();
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.findOne({
                where: {
                    name: req.body.roles[i]
                }
            })) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};
const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername,
    checkRolesExisted: checkRolesExisted
};
module.exports = verifySignUp;
