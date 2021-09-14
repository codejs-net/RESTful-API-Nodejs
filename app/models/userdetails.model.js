module.exports = (sequelize, Sequelize, DataTypes) => {
    const UserDetails = sequelize.define(
      "userdetails", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull:false,
          uniqur:true,
          primaryKey:true,
          autoIncremant:true
        },
        name_si: {
          type: DataTypes.STRING,
        },
        name_ta: {
          type: DataTypes.STRING,
        },
        name_en: {
          type: DataTypes.STRING,
        },
        dob: {
          type: DataTypes.DATE,
        },
        salary: {
          type: DataTypes.DOUBLE,
        },
        spcial_req: {
          type: DataTypes.STRING,
        },
      },
      {
        // Options
        timestamps: true,
        underscrored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    );
  
    return UserDetails;
  };
  