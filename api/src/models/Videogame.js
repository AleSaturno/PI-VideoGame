const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {

    id:{
      type: DataTypes.UUID,
      defaulValue: DataTypes.UUIDV4,
      allowNullValue: false,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    released:{
      type: DataTypes.STRING,
      allowNull: true,
    },

    rating:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    plataforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },

    image:{
      type: DataTypes.STRING,
      allowNull: true,
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    
  },{
    timestamps: false
  });
};
