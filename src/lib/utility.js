import fs from 'fs'
import path from 'path'

class Utility {
  constructor () {

  }

  static readDirAndExportModules(rootDir, requirePath) {
    var result = {}
    fs.readdirSync(rootDir)
      .filter(function (file) {
        return(
          file
          && file.indexOf(".js") !== 0
          && file != "index.js"
        );
      })
      .forEach(function (file) {
        result[path.basename(file, '.js')] = require(rootDir + "/" + file)
      });

    return result
  }

  static calculateSecureHash(value) {
    return value + '_HASHED'
  }

  static getResourceNameFromUrl(url) {
    if (url) {
      var regEx = /\/?api\/v\d\/([a-z]+)/

      var urlParts = regEx.exec(url)
      if (urlParts[1]) {
        return urlParts[1]
      }
    }

    return null
  }
}

export default Utility