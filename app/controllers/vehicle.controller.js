const db = require('../models');
const Vehicle = db.vehicle;


exports.create = async (req, res) => {
    
    if (!req.body.vehicle_number) {
        res.status(404)
            .send({
                status: false,
                message: "vehicle no can't be empty."
            });
        return;
    }


    const vehicle = {
        vehicle_number: req.body.vehicle_number,
        vehicle_type: req.body.vehicle_type,
        status:req.body.status,
    }

    await Vehicle.create(vehicle)
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
    await Vehicle.findAll({ include: { all: true } })
        .then(data => {
            res.status(200).send({
                status:true,
                data:data
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Vehicle not found'
            })
        });
};

exports.getOne = async (req, res) => {
    const id = req.params.id;
    await Vehicle.findByPk(id)
        .then(data => {
            if (data != null) {
                res.send(data);
            } else {
                res.send({
                    message: `Cannot find Vehicle with id=${id}`
                });
            }  
        })
        .catch(err => {
            res.status(500).send(
                {
                    message: err.message || "Error retreiving Vehicle with id= " + id
                }
            );
        });
};

exports.update = async (req, res) => {
    const id = req.params.id;

    const vehicle = {
        vehicle: req.body.vehicle,
        status: req.body.status,
    }

    await Vehicle.update(vehicle, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Vehicle was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Vehicle with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Vehicle with id=" + id
            });
        });
}

exports.destroy=async(req,res)=>{

    const id = req.params.id;

    await Vehicle.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Vehicle was deleted successfully!"
          });
        } else {
          res.send({
            message: `Vehicle was not found! with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Vehicle with id=" + id
        });
      });
}