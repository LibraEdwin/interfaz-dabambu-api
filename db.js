const db = require('mongoose')
const chalk = require('chalk')

// mongodb+srv://user-mbd:<password>@cluster0-qmwio.gcp.mongodb.net/test

db.Promise = global.Promise

async function connect(url) {

    await db.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // serverApi: ServerApiVersion.v1
        // useFindAndModify: false
    })


    db.connection.on('error', (err)=>{
        console.log('>> Failed to connect to MongoDB, retrying...');

        setTimeout( () => {
                mongoose.connect(mongoConnectionString, options);
        }, 5000);
    });

    console.log(`✔️  [DB] Conectada con éxito => ` +  chalk.bgYellow.black(url))
    console.log(db.models)

}

module.exports = {
    connect
}
