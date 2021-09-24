
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.user;

const generateAccessToeken = (uid) => {
    const accessToken = jwt.sign({ id: uid }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_TIME });
    return accessToken;
}

exports.signIn = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        await User.findOne({ where: { username: username } })
            .then(data => {
                // TODO check data is null
                bcrypt.compare(password, data.password, function (err, result) {
                    if (result == true) {
                        const at = generateAccessToeken(data.id);
                        res.send({
                            user_name: data.username,
                            access_token: at,
                        });
                    } else {
                        res.status(404)
                            .send({
                                status: false,
                                message: "Password not valid. "
                            });
                    }
                });

            })
            .catch(err => {
                res.status(404)
                    .send({
                        status: false,
                        message: "User not valid. "
                    });
            });

    } catch (error) {
        res.status(404)
            .send({
                status: false,
                message: "Password or Username not valid. "
            });
    }
}
// exports.signup = (req, res) => {
 
// };


// exports.signout = (req, res) => {
 
// };

