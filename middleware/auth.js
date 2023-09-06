const jwt = require("jsonwebtoken");

const auth = async function (req, res, next) {

    try {
        const bearerHeader = req.header('Authorization', 'Bearer Token')

        if (!bearerHeader) {
            return res.status(400).send({ status: false, msg: "token is required" })
        }
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        let decoetoken = jwt.verify(token, "someverysecuredprivatekey")
        if (!decodetoken) {
            return res.status(401).send({ status: false, msg: "please enter the right token" })
        }

    
        console.log(decodetoken.userId)

        req.userId = decodetoken.userId
        next()

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })

    }
}
  
module.exports.auth= auth

