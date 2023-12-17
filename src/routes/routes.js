var express = require("express");

var router = express.Router();

//Authentication imports
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'supersecrethidden';


router.use(express.json());
const sequelize = require('../database');


// Takes JWT  from Headers and verifies with secretKey which is used at the time of signing JwT.
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  try {

    const decoded = jwt.verify(token, SECRET_KEY);
    
    req.user = decoded;
    
    next(); // to route to next middleware, in post /users, it proceeds for authorization.

  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

const authorizeUser = (req, res, next) => {
  const userId = req.user.userId;
  if (userId !== 1) { 
    // Only user with userId 1 is permitted to add users.
    return res.status(403).json({ error: "Forbidden: Insufficient privileges" });
  }
  next();
};



router.post("/login", (req, res) => {
  const { username, password, user_id } = req.body;
  if (username == "test" && password == "test") {
    const token = jwt.sign({ userId: user_id, username: username }, SECRET_KEY);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Authentication failed" });
  }
});





router.get("/", async (req, res) => {
  try {
    const results = await sequelize.query('SELECT * FROM users');
    res.send({ usersData: results });
  } catch (error) {
    console.error(`Error reading users data - ${error.message}`);
    res.status(500).send(`Error reading users data - ${error.message}`);
  }
});

router.get("/:id", authenticateUser, async (req, res) => {
  const userId = req.params.id;

  try {
    const results = await sequelize.query(`SELECT * FROM users WHERE userId = ${userId}`);

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = results[0];

    if (req.user.userId != userId) {
      return res.status(403).json({ error: "Forbidden: Access denied" });
    }

    res.send({ userData });
  } catch (error) {
    console.error(`Error reading user data - ${error.message}`);
    res.status(500).send(`Error reading user data - ${error.message}`);
  }
});

router.post("/", authenticateUser, authorizeUser, async (req, res) => {

  const {userId, title, completed} = req.body;
  try {
    const results = await sequelize.query(`INSERT INTO users (userId, title, completed) VALUES (${userId}, ${title}, ${completed})`);

    res.send("User Insreted successfully");
  } catch (error) {
    console.error(`Error inserting user data - ${error.message}`);
    res.status(500).send(`Error inserting user data - ${error.message}`);
  }
});

module.exports = router;


