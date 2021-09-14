module.exports = (sequelize, Sequelize, DataTypes) => {
    const Role = sequelize.define(
      "role", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull:false,
          uniqur:true,
          primaryKey:true,
          autoIncremant:true
        },
        role_name: {
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
  