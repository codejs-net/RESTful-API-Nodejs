const config = require("../config/dbconfig");
const { Sequelize, DataTypes} = require("sequelize");


const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,

    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize, DataTypes);
db.role = require("./role.model")(sequelize, Sequelize, DataTypes);
db.userdetails = require("./userdetails.model")(sequelize, Sequelize, DataTypes);
db.vehicle = require("./vehicle.model")(sequelize, Sequelize, DataTypes);



module.exports = db;
