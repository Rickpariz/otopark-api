const express = require('express');
const server = express();
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.connect('mongodb://localhost/otopark', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
server.use(express.json());
server.use(routes);

server.listen(3003)

