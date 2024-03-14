const jwt = require('jsonwebtoken')
const keysecret = 'blogerposttoken';


    function logauth (req,res,next){
        const token = req.headers.Authorization
        console.log('token',token);
        if(!token){
            res.status(401).json({ message: 'Unauthorized' });
        }else{
            {
                jwt.verify(token, keysecret, (err, decodedToken) => {
                if (err) return res.status(401).json({ message: 'Token verification failed' });
                req.userId = decodedToken.userId;
                next();
                });
            }
        }
    }



module.exports = {logauth};