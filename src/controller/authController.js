const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require("../../.env")

const UserMongo = require('../models/user')


function generateToken(userId){
    return jwt.sign({id:userId}, authConfig.secret,{
        expiresIn:86400
    })
}


router.post('/register', async (req, res)=>{
    const {email} = req.body

    try{
        if(await UserMongo.findOne({email}))
            return res.status(400).json({error:"user already exists"})

        const user = await UserMongo.create(req.body)

        user.password = undefined;              
        
        return res.status(201).send({user, token:generateToken(user._id)})

    }catch(err){
        return res.status(400).json({"error":"Registration failed"})

    }
})

router.post('/authenticate', async (req,res)=>{
    const {email, password} = req.body

        const user = await UserMongo.findOne({email}).select('+password')
        
        if(!user)
            return res.status(400).json({"error": "User not found"})

        if(!await bcrypt.compare(password, user.password))
            return res.status(400).json({error:"Invalid password"})

        user.password = undefined    
      

        res.status(200).send({user, token : generateToken(user._id)})
    
})


module.exports = app => { app.use('/auth', router) }