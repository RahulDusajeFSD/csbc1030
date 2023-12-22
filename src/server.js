const express = require('express');
const app = express();
const sm_model = require('./model/sm_model');
const sm_routes = require('./routes/sm_routes');


app.use('/users', sm_routes); 


sm_model.testConnection();

const port = 8091;


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
