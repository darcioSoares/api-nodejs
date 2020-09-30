const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//carregando rotas
require('./app/src/controller/authController')(app);
require('./app/src/controller/projectController')(app);
require('./app/src/controller/recoverPasswordController')(app);


app.listen(3003, (req,res)=>{
    console.log('serve run port 3003')
})