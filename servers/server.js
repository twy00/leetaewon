const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001;
const route = require("./routes/index");


app.use(cors());
app.use(cors({origin: 'http://localhost:3000'}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers","Content-Type");
    next();
})


app.use(bodyParser.json());
app.use('/main', route);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})