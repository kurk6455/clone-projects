const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

const userRoutes = require('./routes/user.routes')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({
        message: "In the home route"
    })
})

app.use('/users', userRoutes);

module.exports = app;