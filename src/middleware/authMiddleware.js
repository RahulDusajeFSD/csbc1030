const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Planet@110099';

function authenticateUser(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];  // Extracts the token - Bearer TOKEN - so [1] gets TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);  // Verifying the JWT Token.
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

function authorizeUser(req, res, next) {  // only permits the user with id 1
  const userId = req.user.userId;
  if (userId !== 1) {              
    return res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
  }
  next();
}

module.exports ={authenticateUser, authorizeUser}

