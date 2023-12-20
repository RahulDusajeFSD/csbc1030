const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use('/users', userRoutes);  // starting point of application exposed to client. 

//the requests coming in from /users will be routed to userRoutes


const port = 8084;


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
