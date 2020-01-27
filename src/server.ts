import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'
import app from './app'

const PORT = process.env.PORT

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'config/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'config/cert.pem')),
}

https.createServer(httpsOptions, app).listen(PORT)
