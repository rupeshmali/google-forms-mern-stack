const express = require('express');
const cors = require('cors');
const { verifyUser } = require('./middlewares/auth');
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// user router
const userRouter = require('./routes/users');
app.use('/users', verifyUser, userRouter)

// auth router
const authRouter = require('./routes/auth');
app.use('/auth', authRouter)

// form router
const formRouter = require('./routes/forms');
app.use('/forms', verifyUser, formRouter)


// listen on port number
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening at port ${port}`))