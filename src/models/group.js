'use strict'

export default (sequelize, DataTypes) => {
    var Group = sequelize.define(
        'Group',
        {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: {
                        args: /^[A-Za-z0-9]{20}$/,
                        msg: "INVALID_GROUP_NAME"
                    },
                    isUnique: (value, next) => {
                        Group.findOne({ where: { name: { ilike: value }}})
                            .then((group) => {
                                if (group)
                                    return next("GROUP_EXISTS")
                                else
                                    return next()
                            }).catch(err => {
                                return next("SERVER_ERROR")
                            })
                    }
                }
            },
            leaderRollNo: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }
    )

    return Group
}