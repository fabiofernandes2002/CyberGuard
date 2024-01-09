let jwt = require('jsonwebtoken');

let secret = "%)$2sF55Idf(Rm&jyPnkqAL^+8m4dSw)"; 

exports.validateToken = async (req, res, next) => {
    const header = req.headers['x-access-token'] || req.headers.authorization;
    if (typeof header === 'undefined') {
        return res.status(401).json({
            success: false,
            msg: "Token não fornecido!"
        });
    }

    const bearer = header.split(' ');
    const token = bearer[1];

    try {
        let decoded = jwt.verify(token, secret);
        req.loggedUserId = decoded.id;
        req.loggedUserType = decoded.userType;
        req.loggedUserUsername = decoded.username;
        req.loggedUserIsOwner = decoded.isOwner;
        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            msg: "Sem autorização!"
        });
    }
};

/* const generateToken = (user_info, callback) => {
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
exports.validateToken = validateToken */