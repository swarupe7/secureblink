const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const router=require('./Routes/Autho');
const helmet = require('helmet');


const app=express();
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(cors());

app.use('/auth',router);

module.exports =app;