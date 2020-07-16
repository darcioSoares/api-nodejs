const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose. connect("mongodb://localhost/cadastro",
{ useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose;