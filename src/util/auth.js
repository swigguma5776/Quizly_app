const jwt = require('jsonwebtoken')

const createJWT = (user) => {
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })

    // console.log(`util token: ${token}`)
    return token
}

module.exports = { createJWT }