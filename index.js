const express = require('express');
const app = express();
const PORT = 8002;

app.use('/', require('./routes'));

//views engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(PORT, function(err){
    if(err){
        console.log(err);
    }
    
    console.log("Running of port:",PORT);
})

