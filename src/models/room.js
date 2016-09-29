"use strict";

module.exports = function (sequelize, DataTypes) {
    var Room = sequelize.define(
        "Room",
        {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            number: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: true
                }
            },
            cluster: {
                type: DataTypes.STRING,
                allowNull: false
            },
            floor: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            wing: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );

    return Room;
}