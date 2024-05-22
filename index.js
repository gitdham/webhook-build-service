const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const path = require('path')

const app = express()
const PORT = 3030

app.use(bodyParser.json())

// test endpoint
app.get('/test', (req, res) => {
  console.log('test')
  res.status(200).send('Test success')
})

// webhook endpoint
app.post('/webhook/trigger', (req, res) => {
  const appDir = path.join(__dirname, '../demo-article')

  console.log('build start')
  exec('pnpm run build', { cwd: appDir }, (error, stdout, stderr) => {
    if (error) return console.error(`Error executing build: ${error.message}`)
    if (stderr) console.log(`Build stderr: ${stderr}`)
    console.log(`Build stdout: ${stdout}`)
    console.log(`Finish build`)
  })

  res.status(200).send('Webhook received')
})

app.listen(PORT, () => {
  console.log(`Webhook service running on port ${PORT}`);
});
