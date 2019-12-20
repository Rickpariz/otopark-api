const express = require('express');
const server = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

mongoose.connect('mongodb+srv://rickpariz:rickpariz@rickpariz-xejxo.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

server.use(cors({credentials: true, origin: true}));

server.use(express.json());
server.use(routes);

server.listen(process.env.PORT || 3003);

