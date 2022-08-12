const db = require("../models/index")
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sequelize = db.sequelize

exports.signup = async (req, res) => {
    // Save User to Database
    try {
        const retults = sequelize.transaction(async (t) => {
            const user = await db.User.create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 8),
                name: req.body.name,
                lastname: req.body.lastname
            }, { transaction: t })
            if (user) {
                if (req.body.roles) {
                    const roles = await db.Role.findAll({
                        where: {
                            name: {
                                [Op.or]: req.body.roles
                            }
                        }
                    }, { transaction: t })
                    if (roles) {
                        await user.setRoles(roles, { transaction: t })
                        if (req.body.isTechnician) {
                            const technician = await db.Technician.create({
                                name: req.body.name.charAt(0) + req.body.lastname.charAt(0)
                            }, { transaction: t })
                            await technician.setUser(user, { transaction: t })
                        }
                        res.status(200).send({ message: "Usuario registrado exitosamente!" })
                    }
                }
                else {
                    await user.setRoles([1], { transaction: t })
                    if (req.body.isTechnician) {
                        const technician = await db.Technician.create({
                            name: req.body.name.charAt(0) + req.body.lastname.charAt(0)
                        }, { transaction: t })
                        await technician.setUser(user, { transaction: t })
                    }
                    res.status(200).send({ message: "Usuario registrado exitosamente!" })
                }
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

};
exports.signin = async (req, res) => {
    console.log(req.body)
    try {
        const results = await sequelize.transaction(async (t) => {
            const user = await db.User.findOne({
                where: {
                    username: req.body.username
                }
            })
            if (!user) {
                return res.status(404).send({ message: "Usuario no encontrado" });
            }
            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Contraseña incorrecta!"
                });
            }
            if (!user.active) {
                return res.status(403).send({
                    accessToken: null,
                    message: "Usuario inactivo!"
                });
            }
            let token = jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: "2h" // 24 hours
            });
            let authorities = [];
            const roles = await user.getRoles({ transaction: t })
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
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
