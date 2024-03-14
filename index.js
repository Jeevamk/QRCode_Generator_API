const express = require('express');
const app = express();
const PORT = process.env.PORT || 3010;
const dotenv = require('dotenv').config({path:'config.env'})
const morgan = require('morgan')
const bodyparser = require('body-parser')
const cors = require('cors')
const mongoose = require('./server/database/connection')
const userRoutes = require('./server/routes/user')


app.use(bodyparser.json())
app.use(morgan('tiny'))
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(bodyparser.urlencoded({extended:true}))


app.use('/user',userRoutes)


app.get('/',(req,res)=>{
    res.status(200).json({'message':'success'})
})



app.listen(PORT,()=>{console.log(`app running on port ${PORT}`)})