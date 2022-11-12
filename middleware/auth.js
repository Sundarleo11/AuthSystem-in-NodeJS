const jwt = require("jsonwebtoken");
const user = require("../model/user");

const auth = (req, res, next) => {
    console.log(req.cookies);
    //console.log(req.header)
    const token =
        req.cookies.token ||
        req.body.token ||
        req.header("Authorization").replace("Bearer ", "");


    if (!token) {
        returnres.status(403).send("token is missing");

    }

    try {
        const decode = jwt.verify(token, process.env.SECRTET_KEY);
        console.log(decode);
        req.user = decode;
    } catch (error) {
        //  console.log(error)
        return res.status('401').send("Invalid token");
    }
    return next();
}

module.exports = auth;