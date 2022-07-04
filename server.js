const express = require('express')
const app = express()
const http = require('http')
const https = require('https')

const { readFileSync } = require('fs')

// const hbs = require('express-handlebars')
// const socket = require('./socket')

const bodyParser = require('body-parser')
const cors = require('cors')
const chalk = require('chalk')
const db = require('./db')

const router = require('./network/routers')
const { config } = require('./config')

app.use(cors({
  // origin: 'http://localhost:3000',
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded
// app.use(upload.array()); // for parsing multipart/form-data

app.set('view engine', 'html')

// ------------------------------------//

// socket.connect(server)
// router_vista(app)
router(app)

// Crear directorios estáticas

app.use('/app', express.static('public'))
app.use('/app', express.static('imagenesProducto'))

// Conexión a base de datos

db.connect(config.DB_URI)

// Crear servidor HTTP o HTTPS

if (!config.HTTPS) {
  http.createServer(app).listen(config.PORT, function () {
    console.log(`✔️  Servidor NodeJS en escucha => ${chalk.bgGreen.black(`${config.HOST}:${config.PORT}`)} `)
  })
}

if (config.HTTPS) {
  try {
    https
      .createServer(
        {
          key: readFileSync(`/etc/letsencrypt/live/${config.DOMAIN_NAME_CERT}/privkey.pem`),
          cert: readFileSync(`/etc/letsencrypt/live/${config.DOMAIN_NAME_CERT}/cert.pem`),
          ca: readFileSync(`/etc/letsencrypt/live/${config.DOMAIN_NAME_CERT}/chain.pem`)
        }, app)
      .listen(config.PORT, () => {
        console.log(`✔️  Listening server HTTPS => ${chalk.bgGreen.black(`${config.HOST}:${config.PORT}`)} `)
      })
  } catch (error) {
    if (error.code == 'ENOENT') {
      console.log('❌ [CERT] No se encontró algún archivo de certificado HTTPS')
    }
  }
}
