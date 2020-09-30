const mongoose = require('mongoose')
const namedb = require('../../.env')

mongoose.Promise = global.Promise

mongoose. connect("mongodb://localhost/"+ namedb.db,
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(function(db){
    console.log("mongoDB")
}).catch(function(err){
    console.log("erro mongodb ====> "+err)
})

module.exports = mongoose;