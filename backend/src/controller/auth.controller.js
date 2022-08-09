const db = require("../models/index")
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
    // Save User to Database
    db.User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        name: req.body.name,
        lastname: req.body.lastname
    })
        .then(user => {
            if (req.body.roles) {
                db.Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "Usuario registrado exitosamente!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "Usuario registrado exitosamente!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
exports.signin = (req, res) => {

    console.log(req.body)
    db.User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "Usuario no encontrado" });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Contraseña incorrecta!"
                });
            }
            let token = jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: "2h" // 24 hours
            });
            let authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
