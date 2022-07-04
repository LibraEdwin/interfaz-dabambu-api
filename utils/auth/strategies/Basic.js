const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const bcrypt = require('bcryptjs')

passport.use(
    new BasicStrategy( function(username, password, cb){

        if(!username || !password){
            console.log('mirame')
            return cb('{"error": "No existen datos para la autenticación"}', false)
        }

        const user = {username: username, password: password}
        
        return cb(null, user)
    })
)