const app=require('./app');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://20pa1a05e7:20pa1a05e7@cluster0.zz5yxue.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{console.log('connected to MongoDB')});



app.listen(8080,()=>{
    console.log('listening on port 8080')
})

