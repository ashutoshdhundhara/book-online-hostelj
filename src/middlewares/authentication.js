'use strict'

import jwt from 'jsonwebtoken'

import config from 'config'
import { AccessToken } from 'models'
import logger from 'lib/logger'

export default (req, res, next) => {
    // Try to get `access_token` first from request body,
    // then from query then cookie and finally from headers.
    var accessToken = req.query.access_token
        || req.body.access_token
        || req.cookies.access_token
        || req.headers['x-access-token']

    if (accessToken) {
        jwt.verify(
            accessToken,
            config.jwtSecret,
            {
                algorithm: config.jwtAlgo
            },
            (err, payload) => {
                if (err) {
                    return res.status(403)
                        .send({
                            success: false,
                            error: {
                                code: "AUTH_FAILED"
                            }
                        }).end()
                } else {
                    // Validate access_token from DB as well.
                    AccessToken.findOne({
                        where: {
                            token: accessToken
                        }
                    }).then(token => {
                        if (token && (Date.now() - new Date(token.createdAt) < token.ttl)) {
                            // Read some metadata from `jwt` and set to request object.
                            req.userMeta = {
                                rollNo: payload.rNo
                            }

                            next()
                        } else {
                            // Token has expired.
                            return res.status(403)
                                .send({
                                    success: false,
                                    error: {
                                        code: "AUTH_FAILED"
                                    }
                                }).end()
                        }
                    }).catch(err => {
                        logger.error("Error occurred while validating token from DB.",
                            {
                                token: accessToken,
                                rollNo: payload.rollNo
                            },
                            err
                        )
                        return res.status(500)
                            .send({
                                success: false,
                                error: {
                                    code: "SERVER_ERROR"
                                }
                            }).end()
                    })
                }
            })
    } else {
        return res.status(403)
            .send({
                success: false,
                error: {
                    code: "ACCESS_FORBIDDEN"
                }
            }).end()
    }
}