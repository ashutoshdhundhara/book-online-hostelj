'use strict'

export default (sequelize, DataTypes) => {
    var AccessToken = sequelize.define(
        'AccessToken',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            token: {
                type: DataTypes.STRING(1023),
                allowNull: false
            },
            ttl: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            rollNo: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }
    )

    return AccessToken
}