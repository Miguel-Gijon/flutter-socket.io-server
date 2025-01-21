const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

    // Read token
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'There is no token in the request'
        });
    }

    try{

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;


        next();

    }catch (error) {
        res.status(401).json({
            ok: false,
            message: 'Invalid token'
        });
    }

    
}



module.exports = {
    validateJWT
}