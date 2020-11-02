// Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '554DC5D837DC6C612A1D17E8D129A442F9E7B5FE041111FFC8FF146F158FA74E';

// Exported functions
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    }
}