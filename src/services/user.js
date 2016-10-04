import { User, UserMasterRecord, UserRole } from 'models'
import config from 'config'
import logger from 'lib/logger'

class UserService {
  constructor() {
  }

  getAll(req, res) {
    User.findAll({
      attributes: {
        exclude: [
          'password',
          'uniqueId',
          'createdAt',
          'updatedAt'
        ]
      }
    }).then(function (users) {
        res.status(200)
          .json(users)
      });
  }

  save(req, res) {
    res.setHeader('content-type', 'application/json')

    if (req.body && req.body.user) {
      var user = req.body.user

      if (user.rollNo && typeof user.rollNo === 'number') {
        UserMasterRecord.findOne({ where: { rollNo: user.rollNo } })
          .then(masterRecord => {
            if (masterRecord || config.env === 'dev') {
              User.create(req.body.user)
                .then(user => {
                  UserRole.create({
                    rollNo: user.rollNo,
                    roleName: 'resident'
                  }).then(userRole => {

                    // We shouldn't be sending password back.
                    user.password = undefined

                    res.status(200)
                      .json({ success: true, user })
                  }).catch(err => {
                    res.status(400)
                      .send({
                        success: false,
                        error: {
                          code: err.errors[0].message
                        }
                      })
                  })
                })
                .catch(err => {
                  res.status(400)
                    .send({
                      success: false,
                      error: {
                        code: err.errors[0].message
                      }
                    })
                })
            } else {
              res.statusCode = 200
              res.send({ success: false, error: { code: "INVALID_USER" } })
              res.end()
            }
          })
      } else {
        res.statusCode = 200
        res.send({ success: false, error: { code: "INVALID_ROLLNO" } })
        res.end()
      }
    }
  }

  update(req, res) {
    res.setHeader('content-type', 'application/json')

    if (req.body && req.body.user) {
      var user = req.body.user

    }
  }
}

export default UserService