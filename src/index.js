const express = require('express');

const app = express();

app.use(express.json())
require('./routes')(app);


app.listen(3000,()=>{
    console.log('this is port 3000')
})

module.exports = app;