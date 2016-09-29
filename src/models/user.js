"use strict";

export default (sequelize, DataTypes) => {
    var User = sequelize.define(
        "User",
        {
            rollNo: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                validate: {
                    isInt: {
                        msg: "ROLLNO_NOT_INTEGER"
                    },
                    isUnique: (value, next) => {
                        User.findOne({
                            where: {rollNo: value}
                        }).then((user) => {
                            if (user) {
                                return next("USER_EXISTS")
                            }
                            return next()
                        }).catch((err) => {
                            return next(err)
                        })
                    }
                }
            },
            uniqueId: {
                type: DataTypes.STRING
            },
            firstName: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    is: {
                        args: /^[a-zA-Z ]+$/,
                        msg: "INVALID_FIRSTNAME"
                    },
                    notEmpty: {
                        msg: "EMPTY_FIRSTNAME"
                    }
                }
            },
            lastName: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    is: {
                        args: /^[a-zA-Z ]+$/,
                        msg: "INVALID_LASTNAME"
                    },
                    notEmpty: {
                        msg: "EMPTY_LASTNAME"
                    }
                }
            },
            branch: {
                type: DataTypes.INTEGER,
                defaultValue: -1,
                validate: {
                    isInt: {
                        msg: "INVALID_BRANCH"
                    },
                    isPositive: (value, next) => {
                        if (value < 0)
                            return next("INVALID_BRANCH")
                        else
                            return next()
                    }
                }
            },
            mobile: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    is: {
                        args: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                        msg: "INVALID_MOBILE"
                    },
                    notEmpty: {
                        msg: "EMPTY_MOBILE"
                    }
                }
            }
        }
    )

    return User
}