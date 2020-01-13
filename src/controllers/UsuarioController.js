const Usuario = require('../models/Usuario');
const EstacionamentoCollection = require("../models/Estacionamento");

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const mongoose = require('mongoose');

module.exports = {
    async create(req, res) {
        try {
            const { nome, email, senha, tipo, estacionamento } = req.body;

            if (!nome || !email || !senha || !tipo) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const hash = bcrypt.hashSync(senha, salt);

            const usuario = await Usuario.create({
                nome,
                email,
                senha: hash,
                tipo
            });

            if(tipo == "Dono") return res.json(usuario);

            await EstacionamentoCollection.updateOne({ _id: new mongoose.Types.ObjectId(estacionamento)}, {$push: {
                'funcionarios': new mongoose.Types.ObjectId(usuario._id)
            }});

            return res.json(usuario);
            
        } catch (err) { res.status(500).send(err.message) }
    },

    async getAll(req, res) {
        try {
            const { filters } = req.query;
            let query = {};
            
            if(filters && filters.tipo) query['tipo'] = filters.tipo;

            const usuarios = await Usuario.find(query).exec();
            return res.json(usuarios);

        } catch (err) { res.status(500).send(err.message) }
    },

    async getOne(req, res) {
        try {
            const { usuario } = req.params;

            if (!usuario) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const usuarioEncontrado = await Usuario.findOne({ _id: new mongoose.Types.ObjectId(usuario) }).exec();
            return res.json(usuarioEncontrado);

        } catch (err) { res.status(500).send(err.message) }
    },

    async update(req, res) {
        try {
            const { usuario, nome, email, tipo } = req.body;

            if (!usuario || !nome || !email || !tipo) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const usuarioAtualizado = await Usuario.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(usuario) },
                {
                    $set: {
                        nome,
                        email,
                        tipo
                    }
                }, { new: true }).exec();

            return res.json(usuarioAtualizado);
        } catch (err) { res.status(500).send(err.message) }
    }
}