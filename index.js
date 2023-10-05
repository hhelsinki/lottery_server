const express = require('express');
const PORT = 3001;
const cors = require('cors')
const app = express();

//import functions
const {generatePrice} = require('./services/gen_price.js')

//config
app.use(cors());

//route
app.get('/price', generatePrice)

//port
app.listen(PORT, () => {
    console.log('server is running in 3001')
})