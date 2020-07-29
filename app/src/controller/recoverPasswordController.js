const express = require('express')
const router = express.Router()

const userMongo = require('../models/user')

const mailConfig = require('../../../.env')
const mailer = require('../../mail/configMail')
const templanteMail = require('../../mail/templateMail')


router.post("/recover_password", async (req,res)=>{
    let token = "teste"
    const {email} = req.body

    try {
        
        let user = await userMongo.findOne({email})

        if(!user)
            return res.status(400).json({"email":"not find"})
        
            
        mailer.sendMail({
            from:`DARCIO <${mailConfig.mail.user}>`,
            to: email,
            subject:"recuperação de senha",
            text: "testando",
            html: templanteMail(token)

        }).then(msg =>{
            return res.status(201).json({"email":"sucess"})
        }).catch(err=>{
            res.status(400).json({"email":"error"})
        })


    } catch (error) {
        res.status(400).json({"error":true})
    }


})

module.exports = app => app.use("/recover", router)