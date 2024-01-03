const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log("inside jwt middleware");
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);
    try {
        // verify returns an object which have secret key userId &  iat special info
        const jwtResponse = jwt.verify(token, "superusertoken")
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
    }
    catch (err) {
        res.status(401).json("Authorization Failed")

    }




}

module.exports = jwtMiddleware