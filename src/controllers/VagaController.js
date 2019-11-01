const mongoose = require('mongoose');
const Vaga = require('../models/Vaga');

module.exports = {
    async create(req, res) {
        try {
            const { codigo, estacionamento } = req.body;

            if (!codigo || !estacionamento) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const vaga = await Vaga.create({
                codigo,
                estacionamento: new mongoose.Types.ObjectId(estacionamento),
            });

            return res.json(vaga);
        } catch (err) { res.status(500).send(err.message) }
    },

    async getAll(req, res) {
        try {

            const vagas = await Vaga.find().exec();
            return res.json(vagas);

        } catch (err) { res.status(500).send(err.message) }
    },

    async getOne(req, res) {
        try {
            const { vaga } = req.params;

            if (!vaga) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const vagaEncontrado = await Vaga.findOne({ _id: new mongoose.Types.ObjectId(vaga) }).exec();
            return res.json(vagaEncontrado);

        } catch (err) { res.status(500).send(err.message) }
    },

    async update(req, res) {
        try {
            const { vaga, codigo, estacionamento } = req.body;

            if (!vaga || !codigo || !estacionamento) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const vagaAtualizado = await Vaga.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(vaga) },
                {
                    $set: {
                        codigo,
                        estacionamento: new mongoose.Types.ObjectId(estacionamento),
                    }
                }, { new: true }).exec();

            return res.json(vagaAtualizado);
        } catch (err) { res.status(500).send(err.message) }
    }
}