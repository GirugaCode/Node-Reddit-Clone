var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
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

// Add this after you initialize express
app.use(cookieParser());

app.use(express.static('public'));
// Checking if the user is authenticated
var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);

// Exporting .env secret
require('dotenv').config();

// Exporting Auth Controller
require('./controllers/auth.js')(app);

// Exporting Posts Controller
require('./controllers/posts.js')(app);

// Exporting Comments Controller
require('./controllers/comments.js')(app);

// Exporting Replies Controller
require('./controllers/replies.js')(app);

// Set db
require('./data/reddit-db')


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// Mocha Chai Testing
module.exports = app;
