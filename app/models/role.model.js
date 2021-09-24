module.exports = (sequelize, Sequelize, DataTypes) => {
    const Role = sequelize.define(
      "role", // Model name
      {
        // Attributes
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        role: {
          type: DataTypes.STRING,
          unique: true,
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
  
    return Role;
  };
  