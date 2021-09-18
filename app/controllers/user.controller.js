const db = require('../models');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = db.user;


exports.create = async (req, res) => {
    
    if (!req.body.username || !req.body.password) {
        res.status(404)
            .send({
                status: false,
                message: "UserName and Password can't be empty."
            });
        return;
    }

    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds)

    const user = {
        username: req.body.username,
        status: req.body.status,
        password: encryptedPassword
    }

    await User.create(user)
        .then(data => {
            res.status(200).send({
                status: true,
                message: 'Success',
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                status: false,
                message: err.message || "Error occurs creating the User"
            });
        });
};

exports.getAll = async (req, res) => {
    await User.findAll({ include: { all: true } })
        .then(data => {
            res.status(200).send({
                status:true,
                data:data
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'User not found'
            })
        });
};

exports.getOne = async (req, res) => {
    const id = req.params.id;
    await User.findByPk(id)
        .then(data => {
            if (data != null) {
                res.send(data);
            } else {
                res.send({
                    message: `Cannot find User with id=${id}`
                });
            }  
        })
        .catch(err => {
            res.status(500).send(
                {
                    message: err.message || "Error retreiving User with id= " + id
                }
            );
        });
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds)

    const user = {
        username: req.body.username,
        status: req.body.status,
        password: encryptedPassword
    }

    await User.update(user, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
}

exports.destroy=async(req,res)=>{

    const id = req.params.id;

    await User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `User was not found! with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
}