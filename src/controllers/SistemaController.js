const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

module.exports = {
    async login(req, res){
        const { email, senha } = req.body;

        if(!email || !senha) {
            return res.status(500).send('Informações não enviadas para o servidor');
        }

        const usuario = await Usuario.findOne({ email }).exec();

        if(!usuario || !bcrypt.compareSync(senha, usuario.senha)){
            return res.status(500).send('Email ou senha inválidos');
        }

        return res.json(usuario);

    }
}