const authModel = require('../model/userAuthModel');

function login(req, res) {
    console.log(req.body);
  const { username, password, user_id } = req.body;
  
  if (username === 'user_1' && password === 'user_1') { 
    const token = authModel.generateToken({ userId: user_id, username: username });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Authentication failed' });
  }
}

module.exports={login}
