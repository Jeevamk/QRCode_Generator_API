const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type :String
    },
    email :{
        type : String,
        required : true,
        unique:true
    },
    password :{
        type : String
    },
    images : [
        {
            type:String
        }
    ]
})


userSchema.pre('save',async function (next){
    this.password = await bcrypt.hash(this.password,10)
    next()
})



const userCollection  = new mongoose.model ("userCollection",userSchema)
module.exports = userCollection