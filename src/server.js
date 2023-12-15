var express = require("express");

var app = express();

const port = 8078;

const userRoutes = require("./routes/routes");

app.listen(port, () => {
  try {
    console.log(`Server Stared at port ${port}`);
  } catch (error) {
    console.error(`Error Setting up the server ${error}`);
  }
});

app.use("/users", userRoutes);
