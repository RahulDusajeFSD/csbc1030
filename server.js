const express = require('express');

const app = express();

const userRoutes = require('./routes/userRoutes');

app.use('/users', userRoutes);

const port = 8081; 
app.listen(port, () => {

  console.log(`Server is running on port ${port}`);
});
