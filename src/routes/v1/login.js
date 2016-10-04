import express from 'express'

import AuthService from 'services/auth'

var router = express.Router()
var authService = new AuthService()

router.post('/', (req, res) => {
  authService.authenticate(req, res)
})

module.exports = router