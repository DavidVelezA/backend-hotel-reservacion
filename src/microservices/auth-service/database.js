const mongoose = require('mongoose')

mongoose.connect('mongodb://mongo/bd-hotel', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(db => console.log('BD CONECTADA A', db.connection.host))
    .catch(err => console.err(err));