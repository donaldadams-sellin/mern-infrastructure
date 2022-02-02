const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    let token = req.get('Authorization') || req.query.token;
    if (token) {
        //remove bearer if included in token header
        token = token.replace('Bearer ', '');
        //check if token is valid, non-expired
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            //if valid decoded will be tokens payload
            //if invalid token, err will be set
            req.user = err ? null : decoded.user;
            //adding expiration of token to req(optional)
            req.exp = err ? null : new Date(decoded.exp * 1000);
            return next();
        });
    } else {
        //No token sent
        req.user = null;
        return next();
    }
}