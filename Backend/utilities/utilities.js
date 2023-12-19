let jwt = require('jsonwebtoken');

let secret = "%)$2sF55Idf(Rm&jyPnkqAL^+8m4dSw)"; 

const generateToken = (user_info, callback) => {
    let token = jwt.sign({
        data: user_info,
    }, secret, {expiresIn: '24h'});
    return callback(token); 
}

const validateToken = (token, callback) => {
    if(!token) {
        return callback(false); 
    }
    jwt.verify(token.replace('Bearer ', ''), secret, function(error, decoded) {
        console.log(decoded);
        if(error) {
            return callback(false);
        } else {
            return callback(true)
        }
    })
}

exports.generateToken = generateToken
exports.validateToken = validateToken