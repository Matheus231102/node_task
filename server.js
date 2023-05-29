const { app } = require('./index.js')
const { connect_mongodb } = require('./mongo_connection.js')

const PORT = process.env.PORT || 9999

connect_mongodb()
    .then(() => {
        console.log('foi conectado ao mongoDB')
    })
    .catch(() => {
        console.log('there is no connection!')
    })

app.listen(PORT, (err) => {
    if (err) { console.log(err) }
    console.log(`The server is running at the http://localhost:${PORT}`)
})