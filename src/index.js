const express = require('express');

const app = express();
let PORT = process.env.PORT || 3000
app.use(express.json())
require('./routes')(app);


app.listen(PORT,()=>{
    console.log('this is port 3000')
})

module.exports = app;