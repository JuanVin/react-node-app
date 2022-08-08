require('dotenv').config()

let express = require('express'),
    app = express(),
    port = 3000,
    sequelize = require('./database/db'),
    cors = require('cors')

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: 'http://172.17.17.21:3001'
}))

//routes

require('./routes/routes')(app)
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    const syncTables = async () => {
        try {
            await sequelize.sync({ force: false })
            await console.log("All models were synchronized successfully.");
        } catch (error) {
            console.log(error)
        }
    }
    syncTables()
})