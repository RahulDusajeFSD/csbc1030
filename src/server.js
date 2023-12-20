const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const database = require('./model/userModel')

app.use('/users', userRoutes);  // starting point of application exposed to client. 

//the requests coming in from /users will be routed to userRoutes


database.testConnection();

const port = 8085;


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
