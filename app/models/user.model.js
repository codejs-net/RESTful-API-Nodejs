module.exports = (sequelize, Sequelize, DataTypes) => {
    const User = sequelize.define(
      "user", // Model name
      {
        // Attributes
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull:false
        },
        status: {
          type: DataTypes.STRING
        },
        password: {
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
  
    return User;
  };
  