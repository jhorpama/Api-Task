const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

// Initializations
const app = express();
app.set('port', process.env.PORT || 3000);
require('./database');

// Settings


// Middlewares
app.use(cors());
app.use(morgan('short'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(require('./routes/routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Run server
app.listen(app.get('port'), () => {
    console.log('The run server in:', app.get('port'));
});