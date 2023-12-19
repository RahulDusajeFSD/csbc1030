// server.js
const express = require('express');
const userRoutes = require('./routes/routes');
const sequelize = require('./database');

const app = express();
const port = 8079;


app.use(express.json());


app.use('/users', userRoutes);


sequelize.sync({ alter: true })
  .then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }).catch((error) => {
    console.error('Unable to synchronize models with the database: ', error);
  });
