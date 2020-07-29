const mongoose = require('../../database/db')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})
//function mongoose pre() significa que antes de salvar ele vai execultar a função
UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 5)
    this.password = hash
    next()
})


module.exports = mongoose.model('user',UserSchema)