const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  name: { //Anakin Skywalker
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: { //skywalker@ssys.com.br
    type: DataTypes.STRING,
    allowNull: false,
  },

  department: { //Architecture
    type: DataTypes.STRING,
    allowNull: false,
  },

  salary: { //4000.00
    type: DataTypes.STRING,
    allowNull: false,
  },

  birth_date: { //01-01-1983
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
};

module.exports = (sequelize) => {
  const Employee = sequelize.define('Employee',
    attributes,
    {
      timestamps: false,
      tableName: 'Employee',
      underscored: true,
    });

  return Employee;
};