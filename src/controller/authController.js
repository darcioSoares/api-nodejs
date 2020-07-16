const express = require('express')
const router = express.Router()

const UserMongo = require('../models/user')


router.post('/register', async (req, res)=>{
    const {email, password} = req.body

    try{
        if(await UserMongo.findOne({email}))
            return res.status(400).json({error:"user already exists"})

        const user = await UserMongo.create(req.body)
        user.password = undefined;            
        return res.status(201).json(user)

    }catch(err){
        return res.status(400).json({"error":"Registration failed"})

    }


})





module.exports = app => { app.use('/auth', router) }