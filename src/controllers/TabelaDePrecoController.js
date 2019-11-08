const mongoose = require('mongoose');
const TabelaDePreco = require('../models/TabelaDePreco');

module.exports = {
    async create(req, res) {
        try {
            const { tempo, estacionamento, valor } = req.body;

            if (!tempo || !estacionamento || !valor) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const tabeladepreco = await TabelaDePreco.create({
                tempo,
                valor: parseFloat(valor),
                estacionamento: new mongoose.Types.ObjectId(estacionamento),
            });

            return res.json(tabeladepreco);
        } catch (err) { res.status(500).send(err.message) }
    },

    async getAll(req, res) {
        try {
            const { filters } = req.query;
            let query = {};

            if(filters && filters.estacionamento) query['estacionamento'] = new mongoose.Types.ObjectId(filters.estacionamento);

            const tabeladeprecos = await TabelaDePreco.find(query).exec();
            return res.json(tabeladeprecos);

        } catch (err) { res.status(500).send(err.message) }
    },

    async getOne(req, res) {
        try {
            const { tabeladepreco } = req.params;

            if (!tabeladepreco) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const tabeladeprecoEncontrado = await TabelaDePreco.findOne({ _id: new mongoose.Types.ObjectId(tabeladepreco) }).exec();
            return res.json(tabeladeprecoEncontrado);

        } catch (err) { res.status(500).send(err.message) }
    },

    async update(req, res) {
        try {
            const { tabeladepreco, tempo, estacionamento, valor } = req.body;

            if (!tabeladepreco || !tempo || !estacionamento || !valor) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const tabeladeprecoAtualizado = await TabelaDePreco.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(tabeladepreco) },
                {
                    $set: {
                        valor: parseFloat(valor),
                        tempo,
                        estacionamento: new mongoose.Types.ObjectId(estacionamento),
                    }
                }, { new: true }).exec();

            return res.json(tabeladeprecoAtualizado);
        } catch (err) { res.status(500).send(err.message) }
    }
}