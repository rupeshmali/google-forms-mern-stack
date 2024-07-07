const express = require('express');
const cors = require('cors');
const { verifyUser } = require('./middlewares/auth');
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express()
app.use(cors())
app.use(bodyParser.json())


const userRouter = require('./routes/users')
app.use('/users', verifyUser, userRouter)
const authRouter = require('./routes/auth');
app.use('/auth', authRouter)

console.log("from env: ", process.env.PORT);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening at port ${port}`))