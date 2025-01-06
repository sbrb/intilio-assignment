const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index'); 
require('dotenv').config();


const app = express();

app.use(express.json());
app.use('/', routes); 

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
