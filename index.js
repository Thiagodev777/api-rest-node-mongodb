const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config()

app.use(express.urlencoded({extended: false}));
app.use(express.json())

const Person = require('./models/Person');

app.get('/', (req, res)=>{
    res.json({
        nome: 'teste'
    })
})

mongoose.connect(process.env.CONNECTION_MONGODB).then(()=> {
    console.log('ok');
    app.listen(8089);
}).catch((err)=>{
    console.log(err);
})

