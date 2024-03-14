const express = require('express')
const route = express.Router()

const userController = require('../controller/userController')


//registration
route.post('/',userController.createUser)

//login
route.post('/login',userController.login)

//imageupload
route.post('/imageupload',userController.imageUpload)


module.exports = route;