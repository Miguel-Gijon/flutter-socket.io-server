const jwt = require('jsonwebtoken');


const generateJWT = (uid) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
    
            if (err) {
                console.log(err);
                reject('Could not generate the JWT');
            }else{
                resolve(token);
            }
    
        } )
    


    })

};

const checkJWT = (token = '') => {

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];
    } catch (error) {
        return [false, null];
    }

}


module.exports = {
    generateJWT,
    checkJWT
}