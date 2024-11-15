const jwt = require('jsonwebtoken');
const authMiddleware = async(req, res, next) => {
    try {
        const header = req.headers['authorization'];
        
        const token = header.split(' ')[1];
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
            if(err){
                return res.status(400).json({
                    success:false,
                    message:"auth failed"
                })
            }else{
                
                req.userId = decode.id                
                next();
            }
        });

    } catch (error) {
        console.log(error)
        res.status(401).json({
            success:false,
            message:"auth failed"
        })
    }
} 

module.exports = authMiddleware