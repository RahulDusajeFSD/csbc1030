var express = require("express");

var router = express.Router();

const fs = require("fs");


const filePath = __dirname + "/" + "../files/users.json";

router.use(express.json());


router.get("/", (res) => {
  try {
    const usersData = fs.readFileSync(filePath, "utf-8");
    res.send({
      usersData: JSON.parse(usersData),
    });
  } catch (error) {
    console.error(
      `Error reading the contents from users file - ${error.message}`,
    );
    res
      .status(500)
      .send(`Error reading the contents from users file - ${error.message}`);
  }
});

router.get("/:id", (req, res) => {
  try {
    const userData = JSON.parse(usersData).find(
      (item) => item.userId == req.params.id,
    );
    res.send({ userData });
  } catch (error) {
    console.error(
      `Error reading the contents from users file - ${error.message}`,
    );
    res
      .status(500)
      .send(`Error reading the contents from users file - ${error.message}`);
  }
});

// router.post("/", (req, res) => {
//   try {
//     const userData = req.body;
//     fs.appendFileSync(filePath, JSON.stringify(userData), "utf-8");
//     res.send({ userData });
//   } catch (error) {
//     console.error(`Error posting the content to users file - ${error.message}`);
//     res
//       .status(500)
//       .send(`Error posting the content to users file  - ${error.message}`);
//   }
// });

router.post("/", (req, res) => {
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
