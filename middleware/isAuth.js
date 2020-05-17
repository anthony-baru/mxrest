const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const autHeader = req.get('Authorization');
    if (!autHeader) {
        const error = new Error('Not authenticated!')
        error.statusCode = 401;
        throw error;
    }
    const token = autHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }
    if (!decodedToken) {
        const error = new Error('Not authorized.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}