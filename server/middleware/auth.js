const jwt = require('jsonwebtoken')
const keysecret = 'qrcodeposttoken';


    function logauth (req,res,next){
        let token = req.headers.auth
        token = token
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