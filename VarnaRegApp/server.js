const express = require('express');
const registrationRoute = require('./routers/registerationRoute')

const cors=require("cors");

const port = 3001;
const app = express();

app.use(cors())
app.use(express.json());

app.use('/registration',registrationRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})