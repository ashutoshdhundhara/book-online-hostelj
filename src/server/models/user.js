"use strict";

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define(
        "User",
        {
            rollNo: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                validate: {
                    isInt: true
                }
            },
            uniqueId: {
                type: DataTypes.STRING,
                validate: {
                    is: /^[0-9a-zA-Z]+$/
                },
                allowNull: false
            },
            firstName: {
                type: DataTypes.STRING,
                validate: {
                    is: /^[a-zA-Z ]+$/
                },
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                validate: {
                    is: /^[a-zA-Z ]+$/
                },
                allowNull: false
            },
            branch: {
                type: DataTypes.INTEGER,
                validate: {
                    isInt: true
                },
                allowNull: false
            },
            mobile: {
                type: DataTypes.STRING,
                validate: {
                    is: /^(\+\d{1,3}[- ]?)?\d{10}$/
                },
                allowNull: false
            }
        }
    );

    return User;
}