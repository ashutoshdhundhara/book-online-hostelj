'use strict'

import jwt from 'jsonwebtoken'
import { User, AccessToken, UserRole } from 'models'
import Utility from 'lib/utility'
import logger from 'lib/logger'
import config from 'config'

class AuthService {
  constructor () {
  }

  getAccessTokenAsync(user, next) {
    var token = jwt.sign(
      {
        rNo: user.rollNo,
        rol: user.roles
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
            UserRole.findAll({
              where: {
                rollNo: user.rollNo
              },
              attributes: ['roleName']
            }).then(userRoles => {
              user.roles = userRoles.map(role => {
                return role.roleName
              })

              // Token creation may block event loop, not sure BTW.
              this.getAccessTokenAsync(user, (err, token) => {
                if (err) {
                  logger.error("Error while creating token for rollNo: " + user.rollNo, err)
                  res.status(500)
                    .json({ success: false, error: { code: "SERVER_ERROR" }})
                } else {

                  // Save `token` to database.
                  AccessToken.create({
                    token: token,
                    ttl: config.jwtTTL,
                    rollNo: user.rollNo
                  }).then(token => {
                    res.status(200)
                      .json({ success: true, token: token.token })
                  }).catch(err => {
                    logger.error("Error while saving token to database for rollNo: " + user.rollNo, err)
                    res.status(500)
                      .json({ success: false, error: { code: "SERVER_ERROR" }})
                  })
                }
              })
            }).catch(err => {
              logger.error(err)
              res.status(500)
                .json({ success: false, error: { code: "SERVER_ERROR" }})
            })
          } else {
            res.status(401)
              .json({ success: false, error: { code: "INVALID_CREDENTIALS" }})
          }
        })
      } else {
        res.status(400)
          .json({ success: false, error: { code: "INVALID_AUTH_REQUEST" }})
      }
    } else {
      res.status(400)
        .json({ success: false, error: { code: "INVALID_AUTH_REQUEST" }})
    }
  }
}

export default AuthService