// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
// bodyParser is deprecated, now included in Express
// var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.config();

// import the routing file to handle the default (index) route
var index = require('./server/routes/app');
// Get defined routing files (Wk10 Assignment Part II Instruction 1)
const messageRoutes = require('./server/routes/messages');
const contactRoutes = require('./server/routes/contacts');
const documentRoutes = require('./server/routes/documents');

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ... ------------------------------------------------------------------------------------------

var app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
// deprecated, now included in express. Using the next bit instead from David Hendricks.
/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
*/
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
// app.use(express.static(path.join(__dirname, 'dist/cms')));
app.use(express.static(path.join(__dirname, 'dist/cms/browser')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE -- Wk10 Assignment Part II Step 1
app.use('/messages', messageRoutes);
app.use('/contacts', contactRoutes);
app.use('/documents', documentRoutes);

// Tell express to map all other non-defined routes back to the index page
app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/cms/index.html')); // David Hendricks said this should be changed Mar 13 but is it for this file or server/routes/app.js?
  res.sendFile(path.join(__dirname, 'dist/cms/browser/index.html'));
});


// Add the following lines of code below the routing files code in the server.js file:
// establish a connection to the mongo database
mongoose.connect(process.env.MONGODB_URI)
.then(() =>
  console.log('Connected to database!')
)
.catch(err =>
  console.log('Connection failed:', err)
);

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});
