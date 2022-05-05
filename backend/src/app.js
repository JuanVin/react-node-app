require('dotenv').config()

let express = require('express'),
    routes = require('./routes/routes'),
    app = express(),
    port = 3000,
    models = require('./models'),
    sequelize = require('./database/db');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    const syncTables = async() => {
        try {
            await sequelize.sync({ force: true })
            await console.log("All models were synchronized successfully.");
        } catch (error) {
            console.log(error)
        }
    }
    syncTables()
})