const express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");
const routes = require('./routes');
const { default: knex } = require("knex");


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())



app.use(bodyParser.json());
app.use(routes);


//notFound
app.use((req, res, next) =>{
    const error = new Error('Not Found')
    error.status = 404 
    next(error)
})


// catch call
app.use((error, req, res, next)=>{          //identificando os erros 
    res.status(error.status || 500)
    res.json({error: error.message})    
})

const port = 8080;
app.listen(port, () => {
  console.log("listen on port 8080");
});


