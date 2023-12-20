const express = require('express');
const app = express();
const userRoutes = require('./routes/routes');


app.use('/users', userRoutes);


const port = 8082;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
