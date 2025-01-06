const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('./routes/route');
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://riju:riju@cluster0.s4hmv.mongodb.net/library-system')
.then(console.log('Connected to MongoDB'))
    .catch(console.error);

app.use('/', route);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));