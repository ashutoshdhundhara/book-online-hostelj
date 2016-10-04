import Utility from 'lib/utility'

/**
 * Object holding secured actions on resources.
 *
 * Format:
 *  resourse: [...actions]
 */
export const secured = {
  users: ['get']
}

/**
 * Objects containing roles and their permissions on resources.
 *
 * Format:
 *  role: {
 *    resource: [...actions]
 *  }
 */
export const rbacl = {
  anonymous: {
    login: ['post'],
    users: ['get', 'post']
  },
  resident: {
    login: ['post'],
    users: ['get', 'post', 'put']
  }
}

export const isResourceSecured = (req) => {
  var method = req.method.toLocaleLowerCase()

  // Lets not execute this regex again and again,
  // rather save the result to request object.
  req.resource = Utility.getResourceNameFromUrl(req.url)

  if (req.resource) {
    var actions = secured[req.resource]
    if (actions && Array.isArray(actions)) {
      if (actions.indexOf(method) > -1) {
        return true;
      }
    }
  }

  return false
}