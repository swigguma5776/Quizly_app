const jwt = require('jsonwebtoken')

const unprotectedRoutes = [
    '/auth/login',
    '/auth/register',
    '/graphql'
]

const authenticate = (req, res, next) => {
    const token = req.cookies.JWT || ''
    // console.log(`token from middleware: ${token}`)

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.verifiedUser = verified
        console.log('this is middleware quizzes', req.verifiedUser.user)
        
        

        console.log("User verification successful!")
        next()
    }
    catch(err) {
        // Handle the case where the user is not authenticated

        console.log("User verification failed!")

        if (unprotectedRoutes.includes(req.path)) {
            next()
        } else {
            res.redirect('/auth/login')
        }
    }
}

module.exports = { authenticate }