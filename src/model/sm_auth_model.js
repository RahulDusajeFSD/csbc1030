const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Planet@110099';

function generateToken(payload) {  
  return jwt.sign(payload, SECRET_KEY);   // creates the JWT token - binding the payload which is username, password and user_id and 
  // locking it with Secret key
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);

  // verifying the JWT token with Secret key
}

module.exports={generateToken, verifyToken}