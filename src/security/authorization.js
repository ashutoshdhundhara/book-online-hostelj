'use strict'

import { rbacl } from 'security'
import logger from 'lib/logger'

export default (req, res, next) => {

  // First, get user meta information.
  var userRoles = req.session.user.roles

  // Second, get requested resource and method.
  var resource = req.resource
  var method = req.method.toLocaleLowerCase()

  let isAuthorized = false

  userRoles.forEach((role) => {
    let permissions = rbacl[role]

    if (permissions && permissions[resource]) {
      if (permissions[resource].indexOf(method) > -1) {
        isAuthorized = true
        return;
      }
    }
  })

  if (isAuthorized) {
    return next()
  } else {
    res.status(403)
      .json({ success: false, error: { code: "ACCESS_DENIED" }})
  }
}