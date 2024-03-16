const express = require('express');
const app = express();
const PORT = process.env.PORT || 3010;
const dotenv = require('dotenv').config({path:'config.env'})
const morgan = require('morgan')
const bodyparser = require('body-parser')
const cors = require('cors')
const mongoose = require('./server/database/connection')
const userRoutes = require('./server/routes/user')
const path = require('path')


app.use(bodyparser.json())
app.use(morgan('tiny'))
app.use(cors())
// app.use(cors({
//     origin: 'https://qr-code-generator-ui.vercel.app/',
//     methods: ['GET', 'POST'], 
//     allowedHeaders: ['Content-Type', 'auth'], 
//   }));


app.use(bodyparser.urlencoded({extended:true}))

app.use('/images',express.static(path.resolve(__dirname,"assests/images")))

app.use('/user',userRoutes)


app.get('/',(req,res)=>{
    res.status(200).json({'message':'success'})
})



app.listen(PORT,()=>{console.log(`app running on port ${PORT}`)})