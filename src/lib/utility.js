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
}

export default Utility