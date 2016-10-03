'use strict'

import jwt from 'jsonwebtoken'
import { User, AccessToken } from 'models'
import Utility from 'lib/utility'
import logger from 'lib/logger'
import config from 'config'

class AuthService {
    constructor () {
    }

    getAccessTokenAsync(rollNo, next) {
        var token = jwt.sign(
            {
                rNo: rollNo
            },
            config.jwtSecret,
            {
                algorithm: config.jwtAlgo,
                expiresIn: config.jwtTTL
            },
            next
        )
    }

    authenticate(req, res) {
        res.setHeader('content-type', 'application/json')

        if (req.body && req.body.user) {
            var user = req.body.user

            if (user.username && user.password) {
                User.findOne({
                    where: {
                        email: user.username,
                        password: Utility.calculateSecureHash(user.password)
                    }
                }).then(user => {
                    if (user) {
                        // Token creation may block event loop, not sure BTW.
                        this.getAccessTokenAsync(user.rollNo, (err, token) => {
                            if (err) {
                                logger.error("Error while creating token for rollNo: " + user.rollNo, err)
                                res.statusCode = 500
                                res.send({ success: false, error: { code: "SERVER_ERROR" }})
                                res.end()
                            } else {
                                // Save `token` to database.
                                AccessToken.create({
                                    token: token,
                                    ttl: config.jwtTTL,
                                    rollNo: user.rollNo
                                }).then(token => {
                                    res.statusCode = 200
                                    res.send({ success: true, token: token.token })
                                    res.end()
                                }).catch(err => {
                                    logger.error("Error while saving token to database for rollNo: " + user.rollNo, err)
                                    res.statusCode = 500
                                    res.send({ success: false, error: { code: "SERVER_ERROR" }})
                                    res.end()
                                })
                            }
                        })
                    } else {
                        res.statusCode = 401
                        res.send({ success: false, error: { code: "INVALID_CREDENTIALS" }})
                        res.end()
                    }
                })
            } else {
                res.statusCode = 400
                res.send({ success: false, error: { code: "INVALID_AUTH_REQUEST" }})
                res.end()
            }
        } else {
            res.statusCode = 400
            res.send({ success: false, error: { code: "INVALID_AUTH_REQUEST" }})
            res.end()
        }
    }
}

export default AuthService