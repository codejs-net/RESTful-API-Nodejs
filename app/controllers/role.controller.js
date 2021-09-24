const db = require('../models');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const Role = db.role;


exports.create = async (req, res) => {
    
    if (!req.body.role) {
        res.status(404)
            .send({
                status: false,
                message: "Role can't be empty."
            });
        return;
    }


    const role = {
        role: req.body.role,
        status: req.body.status,
    }

    await Role.create(role)
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
    await Role.findAll({ include: { all: true } })
        .then(data => {
            res.status(200).send({
                status:true,
                data:data
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Role not found'
            })
        });
};

exports.getOne = async (req, res) => {
    const id = req.params.id;
    await Role.findByPk(id)
        .then(data => {
            if (data != null) {
                res.send(data);
            } else {
                res.send({
                    message: `Cannot find Role with id=${id}`
                });
            }  
        })
        .catch(err => {
            res.status(500).send(
                {
                    message: err.message || "Error retreiving Role with id= " + id
                }
            );
        });
};

exports.update = async (req, res) => {
    const id = req.params.id;

    const role = {
        role: req.body.role,
        status: req.body.status,
    }

    await Role.update(role, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Role was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Role with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Role with id=" + id
            });
        });
}

exports.destroy=async(req,res)=>{

    const id = req.params.id;

    await Role.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Role was deleted successfully!"
          });
        } else {
          res.send({
            message: `Role was not found! with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Role with id=" + id
        });
      });
}