const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const port = 3000

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Use Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Add after body parser initialization
app.use(expressValidator())

require('./controllers/posts.js')(app)

// Set db
require('./data/reddit-db')


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// Mocha Chai Testing
module.exports = app;
