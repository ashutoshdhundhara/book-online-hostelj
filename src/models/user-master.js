"use strict";

module.exports = function (sequelize, DataTypes) {
    var UserMasterRecord = sequelize.define(
        "UserMasterRecord",
        {
            uniqueId: {
                primaryKey: true,
                type: DataTypes.STRING,
            },
            rollNo: {
                type: DataTypes.INTEGER,
                validate: {
                    isInt: true
                }
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }
    );

    return UserMasterRecord;
}