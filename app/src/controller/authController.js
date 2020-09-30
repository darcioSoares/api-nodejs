const express = require('express')
const router = express.Router()
//
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//
const authConfig = require("../../../.env")
const UserMongo = require('../models/user')
//

function generateToken(userId){
    return jwt.sign({id:userId}, authConfig.secret,{
        expiresIn:86400
    })
}


router.post('/register', async (req, res)=>{
    const data = {...req.body}
        
    try{

        if(await UserMongo.findOne({email: data.email})){
            let num = 1; throw num      
        }
        //obs validar senha maior 0 char        
        if(!(data.password === data.authPassword)){
            let num = 2; throw num
        }  
        delete data.authPassword 
       
        const user = await UserMongo.create(data)
        if(!user){  
            let num = 3; throw num
        }   

        user.password = undefined;        
        
        return res.status(201).send({user, token:generateToken(user._id)})

    }catch(num){

        if(num === 1)            
            return res.status(400).json({"error":"user already exists"})      
        if(num === 2)
            return res.status(401).json({"error":"password and confirm password not check"})
        if(num === 3)
            return res.status(500).json({"error":"Register failed"})
       
        return res.status(401).json({"error":"data not informed"})    
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

router.get('/users', async function(req,res){

    try {
        const find = await UserMongo.find({}) 
        res.send(find)

    } catch (e) {
        return res.status(500).json({"error":"database"})        
    }
})


module.exports = app => { app.use('/auth', router) }