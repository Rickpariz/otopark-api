const express = require('express');
const server = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

mongoose.connect('mongodb+srv://rickpariz:rickpariz@otopark-xejxo.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(data => {
        console.log("CONECTADO COM SUCESSO - OTOPARK");
    })
    .catch(err => {
        console.log("ERRO AO CONECTAR MONGODB")
        console.log(err)
    })

server.use(cors({credentials: true, origin: true}));

server.use(express.json());
server.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
})
server.use(routes);

server.listen(process.env.PORT || 3003);

