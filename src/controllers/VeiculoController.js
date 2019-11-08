const mongoose = require('mongoose');
const Veiculo = require('../models/Veiculo');

module.exports = {
    async create(req, res) {
        try {
            const { placa, modelo, estacionamento, cor, cliente } = req.body;

            if (!placa || !modelo || !estacionamento || !cor || !cliente) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            let veiculo = await Veiculo.create({
                placa,
                modelo,
                estacionamento: new mongoose.Types.ObjectId(estacionamento),
                cliente: new mongoose.Types.ObjectId(cliente),
                cor
            });

            veiculo = await veiculo.populate('cliente').execPopulate();

            return res.json(veiculo);
        } catch (err) { res.status(500).send(err.message) }
    },

    async getAll(req, res) {
        try {
            const { filters } = req.query;
            let query = {};

            if(filters && filters.estacionamento) query['estacionamento'] = new mongoose.Types.ObjectId(filters.estacionamento);

            const veiculos = await Veiculo.find(query).populate('cliente').exec();
            return res.json(veiculos);

        } catch (err) { res.status(500).send(err.message) }
    },

    async getOne(req, res) {
        try {
            const { veiculo } = req.params;

            if (!veiculo) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const veiculoEncontrado = await Veiculo.findOne({ _id: new mongoose.Types.ObjectId(veiculo) }).populate('cliente').exec();
            return res.json(veiculoEncontrado);

        } catch (err) { res.status(500).send(err.message) }
    },

    async update(req, res) {
        try {
            const { veiculo, placa, modelo, estacionamento, cor, cliente } = req.body;

            if (!veiculo || !placa || !modelo || !estacionamento || !cor || !cliente) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const veiculoAtualizado = await Veiculo.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(veiculo) },
                {
                    $set: {
                        placa,
                        modelo,
                        estacionamento: new mongoose.Types.ObjectId(estacionamento),
                        cliente: new mongoose.Types.ObjectId(cliente),
                        cor
                    }
                }, { new: true }).populate('cliente').exec();

            return res.json(veiculoAtualizado);
        } catch (err) { res.status(500).send(err.message) }
    }
}