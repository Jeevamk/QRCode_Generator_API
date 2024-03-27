const express = require('express')
const route = express.Router()

const multer = require('multer');
const upload = multer({ dest : '/tmp'})
const cloudinary = require("../services/helper")



const userController = require('../controller/userController')
const { logauth } = require('../middleware/auth')


//registration
route.post('/',userController.createUser)

//login
route.post('/login',userController.login)

//imageupload
route.post('/imageupload',logauth, upload.array('images',5),userController.imageUpload)

route.get('/images/:userId',userController.getImage)


module.exports = route;