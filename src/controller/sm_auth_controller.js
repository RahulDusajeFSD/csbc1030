const authModel = require('../model/sm_auth_model');

function login(req, res) {              // requests coming from userRoutes. The request body contains username, password and user_id.

  const { username, email, id } = req.body;
  
  if (username === 'learm' && email === 'learm@gmail.com') {      
    const token = authModel.generateToken({ userId: id, username: username });  // only if the values are matched - it generates the JWT token defined in authModel.js
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Authentication failed' });
  }
}

module.exports={login}
