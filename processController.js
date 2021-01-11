const { exec } = require("child_process");
const settings = require('./settings/settings')

async function launchTor() {

    const { pathTor } = settings

    const wasLaunched = await checkLaunchedTor()
    if(wasLaunched) {
        return console.log('\x1b[33m%s\x1b[0m', "Tor successfully launched.")
    }

        return exec("tor.exe", { cwd: pathTor }, (err) => {
            if (err) {
                console.error("Failed to run Tor")
                throw new Error(err)
            } else {
                return console.log('\x1b[33m%s\x1b[0m', "Tor successfully launched.")
            }
        })

    function checkLaunchedTor() {
        return new Promise(function(resolve, reject) {
            exec('tasklist', function(err, resultList) {
                if(err) {
                    console.warn (err)
                    reject(err)
                }
                resolve( resultList.includes('tor.exe'))
            })
        })
    }
}

module.exports.launchTor = launchTor;


