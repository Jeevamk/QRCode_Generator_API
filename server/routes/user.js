const express = require('express')
const route = express.Router()

const userController = require('../controller/userController')
const { logauth } = require('../middleware/auth')


//registration
route.post('/',userController.createUser)

//login
route.post('/login',userController.login)

//imageupload
route.post('/imageupload', logauth,userController.imageUpload)


module.exports = route;