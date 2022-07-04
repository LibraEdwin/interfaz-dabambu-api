/*
Habilitar referencia 'dotenv'
para el uso de variables de entorno de producción en el proyecto.
Variables deben estar en el archivo .env
*/
const path = require('path')

// require('crypto').randomBytes(36).toString('hex')

// require('dotenv').config()
// DB_URI: 'mongodb://usuario:235411@34.125.7.40:27017/test',

const config = {
  // DB_URI: process.env.DB_URI || 'mongodb+srv://vanessapalomino:interfaz@cluster0.hdufp.mongodb.net/Dabambu_v2',
  // DB_URI: 'mongodb://admin:235411@34.125.164.29:27017/dabambu',
  // DB_URI: 'mongodb+srv://userExample:zAaCmbYs8MMoe68e@cluster0.75em6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  // DB_URI: 'mongodb+srv://dbDev:235411@cluster0.xjgs0.mongodb.net/dabambu_v2?retryWrites=true&w=majority',
  DB_URI: 'mongodb+srv://dbDev:235411@serverlessinstance0.xjgs0.mongodb.net/dabambu_v2?retryWrites=true&w=majority',
  PORT: process.env.PORT || 3002,
  HOST: process.env.HOST || 'http://localhost',
  HTTPS: false,
  DOMAIN_NAME_CERT: 'www.dabambu.com',
  JWT: {
    SECRET: process.env.SECRET || 'secret',
    EXPIRE_TOKEN_IN: '1h'
  },
  authJwtSecret: process.env.SECRET || 'e96d01e9aecfe29bc317af42f91834a0a9333b0030b9a75fbd30d4a78e23f1fd79f1f377',
  BUCKETS: {
    NAME: 'container-csi-public',
    PATH_KEY: path.join(__dirname, './project-app-web-circolo-41a340388dc4.json')
  }
}

module.exports = {
  config
}
