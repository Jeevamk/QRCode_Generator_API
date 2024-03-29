const mongoose = require('mongoose')
const userCollection = require('../model/userModel')
const dotenv = require('dotenv').config({path:'config.env'})
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cloudinary = require("cloudinary").v2;
const multer = require('multer');
const upload = multer({ dest : '/tmp'})
const multipleUpload = upload.array('images', 5);

//cloudinary config
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });


  

//registration
const createUser = async (req,res)=>{
    const existedUser = await userCollection.findOne({ email:req.body.email})
    if(existedUser){
        return res.status(400).json({ error: "Email already exists"})
    } else{
        try {
            const { password,confirmPassword } = req.body;
            if(password === confirmPassword) {
                const {name,email} = req.body
                const newUser = new userCollection({
                    name , email ,password
                });
                const saveUser = await newUser.save();
                res.status(201).json(saveUser)
            }else{
                return  res.status(400).json({ error: 'Passwords do not match' })
            }
            
        }catch(err){
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Could not create user' });
        }
    }
}


//login

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await userCollection.findOne({ email });

        if (!userData) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        try {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (passwordMatch) {
                const token = jwt.sign({ userId: userData._id }, "qrcodeposttoken", { expiresIn: '24h' });
                res.cookie("loginsession", token);
                res.status(200).json({ token, userId: userData._id });
            } else {
                return res.status(400).json({ error: 'Invalid password' });
            }
        } catch (error) {
            console.error('Error comparing passwords:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}



// imageupload      
const imageUpload = async (req,res)=>{
    try {
        if(!req.files || req.files.length === 0){
            return res.status(400).json({error:"No files upload"})
        }

        const uploadImages = [];
        for(const file of req.files){
          const result = await cloudinary.uploader.upload(file.path)
          uploadImages.push(result.secure_url)
        }
        const userId = req.userId;
        const user = await userCollection.findById(userId);
        if(!user){
            return res.status(400).json({error : "user not found"})

        }
        user.images = user.images.concat(uploadImages);
        await user.save()
        res.status(200).json({ userId: user._id, images: user.images });

    } catch (error) {
        console.error('Error during image upload:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


//get image
const getImage = async (req,res) => {
    try {
        const userId = req.params.userId;
        const user = await userCollection.findById(userId)
        if(!user){
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ user });
      
    } catch (error) {
        console.error('Error fetching user images:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}



module.exports = {
    createUser,
    login,
    imageUpload,
    getImage
}



