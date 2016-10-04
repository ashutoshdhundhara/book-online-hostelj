'use strict'

export default (sequelize, DataTypes) => {
  var UserRole = sequelize.define(
    "UserRole",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rollNo: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      roleName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }
  )

  return UserRole
}