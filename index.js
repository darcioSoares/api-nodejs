const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//carregano rotas
require('./src/controller/authController')(app);
require('./src/controller/projectController')(app);


app.listen(3003, (req,res)=>{
    console.log('serve run port 3003')
})