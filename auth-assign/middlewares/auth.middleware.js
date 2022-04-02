const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const getUserByToken = (token)=> { 
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if(err) {
                return reject(err)
            }
            resolve(user)
        })
    })
 }
const authCheck = async (req, res, next) => {
 // 1. read the req header 
 const headers = req.headers;
 //2. get the access token from headers
 console.log(headers.accesstoken);
 const accesstoken = headers.accesstoken;
 //3. if access token is not present in header, then 400
 if(!(accesstoken && accesstoken.startsWith("Bearer "))) {
     return res.status(400).send("User doesnt have access to post the product")
 }
 // get the user info from token
 const token = accesstoken.split(" ")[1]
let user ;
try {
 //4. if token exists then get the user and validate the token

    user = await getUserByToken(token)
    req.user = user.user
    //if token matches with a user, allow him to go next
} catch (error) {
 //else  400

    return res.
    status(400).
    send("Authorization token was not provided or was not valid")
}
return next()
}

module.exports = authCheck