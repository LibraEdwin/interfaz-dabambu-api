const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { config } = require('../../../config')
// const storeUser = require('../../../components/usuario/store')

const opciones = {
  secretOrKey: config.JWT.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(
  new Strategy(opciones, async (tokenPayload, done) => {
    return done(null, tokenPayload.usuario)
    // const { _id } = tokenPayload.usuario
    // console.log(_id, 'id jwt')

    // storeUser
    //   .existeUsuarioPorId(_id)
    //   .then((existeUsuario) => {
    //     console.log(existeUsuario, 'existe?')
    //     if (!existeUsuario) {
    //       return done(null, false)
    //     }

    //     return done(null, tokenPayload.usuario)
    //   })
    //   .catch((err) => {
    //     return done(err, false)
    //   })
  })
)
