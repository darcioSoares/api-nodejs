const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req,res)=>{
    res.send('teste')
})

require('./controller/authController')(app);

app.listen(3003, (req,res)=>{
    console.log('servidor rodando na porta 3003')
})