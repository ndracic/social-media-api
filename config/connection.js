const { connect, connection } = require('mongoose');

connect('mongodb://localhost/social2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
