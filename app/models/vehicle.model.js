module.exports = (sequelize, Sequelize, DataTypes) => {
    const Vehicle = sequelize.define(
      "vehicle", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull:false,
          uniqur:true,
          primaryKey:true,
          autoIncremant:true
        },
        vehicle_type: {
          type: DataTypes.STRING,
          allowNull:false
        },
        vehicle_number: {
          type: DataTypes.STRING,
          allowNull:false
        },
        status: {
          type: DataTypes.STRING
        }
      },
      {
        // Options
        timestamps: true,
        underscrored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    );
  
    return Vehicle;
  };
  