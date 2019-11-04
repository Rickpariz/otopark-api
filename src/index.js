const express = require('express');
const server = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

mongoose.connect('mongodb://localhost/otopark', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

server.use(cors({credentials: true, origin: true}));

server.use(express.json());
server.use(routes);

server.listen(3003)

