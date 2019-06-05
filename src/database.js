const mongoose = require('mongoose');

const URL = 'mongodb://kira:jhor12345@ds131737.mlab.com:31737/heroku_2mdc9mvq';

mongoose.connect(URL, {
    useNewUrlParser: true
})
  .then(db => console.info('Db is connect'))
  .catch(err => console.error(err));
   
module.exports = mongoose;