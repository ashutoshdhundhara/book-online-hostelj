import { User, UserMasterRecord } from 'models'
import logger from 'lib/logger'

class UserService {
    constructor() {
    }

    getAll(req, res) {
        User.findAll()
            .then(function (users) {
                res.setHeader('content-type', 'application/json');
                res.statusCode = 200;
                res.send(users);
                res.end();
            });
    }

    save(req, res) {
        res.setHeader('content-type', 'application/json')

        if (req.body && req.body.user) {
            var user = req.body.user

            if (user.rollNo && typeof user.rollNo === 'number') {
                UserMasterRecord.findOne({ where: { rollNo: user.rollNo } })
                    .then(masterRecord => {
                        if (masterRecord) {
                            User.create(req.body.user)
                                .then(user => {
                                    res.statusCode = 200
                                    res.send({ success: true, user })
                                    res.end()
                                })
                                .catch(err => {
                                    res.statusCode = 400
                                    res.send({ success: false, error: { code: err.errors[0].message }})
                                    res.end()
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