const { exec } = require('child_process')
const path = require('path')

function triggerBuild() {
  const appDir = path.join(__dirname, '../demo-article')
  exec('pnpm run build', { cwd: appDir }, (error, stdout, stderr) => {
    if (error) return console.error(`Error executing build: ${error.message}`)
    if (stderr) console.log(`Build stderr: ${stderr}`)
    console.log(`Build stdout: ${stdout}`)
  })
}

module.export = { triggerBuild }
