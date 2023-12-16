//Authentication - to verify the credentials of user
//Authorization - what role role does successfuly authenticated user has.

var express = require("express");

var router = express.Router();

const fs = require("fs");

//Authentication imports
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'supersecrethidden';


const filePath = __dirname + "/" + "../files/users.json";
const usersData = fs.readFileSync(filePath, "utf-8");
router.use(express.json());



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

router.get("/", (req,res) => {
  try {
    res.send({
      usersData: JSON.parse(usersData),
    });
  } catch (error) {
    console.error(
      `Error reading the contents from users file - ${error.message}`,
    );
    res.send(`Error reading the contents from users file - ${error.message}`);
  }
});


router.get("/:id", authenticateUser, (req, res) => {
  try {
    const usersData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const userData = usersData.find((item) => item.userId == req.params.id);

    console.log(`req.user.userId ${req.user.userId} and req.params.id ${req.params.id}`);
    if (req.user.userId != req.params.id) {
      return res.status(403).json({ error: "Forbidden: Access denied" });
    }

    res.send({ userData });
  } catch (error) {
    console.error(`Error reading the contents from users file - ${error.message}`);
    res.status(500).send(`Error reading the contents from users file - ${error.message}`);
  }
});

router.post("/", authenticateUser, authorizeUser, (req, res) => {
  try {
    const objectFromRequest = req.body; // data from the request

    const usersDataFromfile = JSON.parse(fs.readFileSync(filePath, "utf-8")); // reading the existing users data

    usersDataFromfile.push(objectFromRequest); // appending the new user's data to existing data

    fs.writeFileSync(filePath, JSON.stringify(usersDataFromfile), "utf-8");

    res.send({ objectFromRequest });
  } catch (error) {
    console.error(`Error posting the content to users file - ${error.message}`);
    res
      .status(500)
      .send(`Error posting the content to users file  - ${error.message}`);
  }
});

module.exports = router;


