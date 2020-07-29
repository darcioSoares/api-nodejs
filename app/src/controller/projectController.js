const express = require('express')
const router = express.Router()

const authJwt = require('../../middlewares/authJwt')


//router.use(authJwt)

router.get('/', authJwt, (req,res)=>{
    res.send({ok: true, user: req.userId})
    
})

module.exports = app => app.use('/projects', router)