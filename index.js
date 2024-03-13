const express = require('express');
const app = express();
const PORT = process.env.PORT || 3010;
const dotenv = require('dotenv').config({path:'config.env'})
const morgan = require('morgan')
const bodyparser = require('body-parser')
const cors = require('cors')


app.use(bodyparser.json())
app.use(morgan('tiny'))
app.use(cors())

app.use(bodyparser.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.status(200).json({'message':'success'})
})



app.listen(PORT,()=>{console.log(`app running on port ${PORT}`)})