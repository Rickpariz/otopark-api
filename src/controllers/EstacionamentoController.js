const Estacionamento = require('../models/Estacionamento');
const mongoose = require('mongoose');

module.exports = {
    async create(req, res) {
        try {
            const { nome, endereco, funcionarios, dono, numeroDeVagas, vagas } = req.body;

            if (!nome || !endereco || !dono || !numeroDeVagas) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            let estacionamento = await Estacionamento.create({
                nome,
                endereco,
                funcionarios: funcionarios ? funcionarios.map(f => new mongoose.Types.ObjectId(f)) : [],
                dono: new mongoose.Types.ObjectId(dono),
                numeroDeVagas: numeroDeVagas,
                vagas: vagas ? vagas.map(v => new mongoose.Types.ObjectId(v)) : []
            })

            estacionamento = await estacionamento.populate('funcionarios').populate('dono').execPopulate();

            return res.json(estacionamento);
        } catch (err) { res.status(500).send(err.message) }
    },

    async getAll(req, res) {
        try {
            const { filters } = req.query;
            let query = {};
            
            if(filters && filters.dono) query['dono'] = new mongoose.Types.ObjectId(filters.dono);

            const estacionamentos = await Estacionamento.find(query).populate('funcionarios').populate('dono').exec();
            return res.json(estacionamentos);

        } catch (err) { res.status(500).send(err.message) }
    },

    async getOne(req, res) {
        try {
            const { estacionamento } = req.params;

            if (!estacionamento) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const estacionamentoEncontrado = await Estacionamento.findOne({ _id: new mongoose.Types.ObjectId(estacionamento) }).populate('funcionarios').populate('dono').exec();
            return res.json(estacionamentoEncontrado);

        } catch (err) { res.status(500).send(err.message) }
    },

    async update(req, res) {
        try {
            const { estacionamento, nome, endereco, funcionarios, dono, numeroDeVagas, vagas } = req.body;

            if (!estacionamento || !nome || !endereco || !dono || !numeroDeVagas) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            let estacionamentoAtualizado = await Estacionamento.findOneAndUpdate({
                _id: new mongoose.Types.ObjectId(estacionamento)
            }, {
                $set: {
                    nome,
                    endereco,
                    funcionarios: funcionarios ? funcionarios.map(f => new mongoose.Types.ObjectId(f)) : [],
                    dono: new mongoose.Types.ObjectId(dono),
                    numeroDeVagas: numeroDeVagas,
                    vagas: vagas ? vagas.map(v => new mongoose.Types.ObjectId(v)) : []
                }
            }, { new: true }).populate('funcionarios').populate('dono').exec();


            return res.json(estacionamentoAtualizado);
        } catch (err) { res.status(500).send(err.message) }
    }
}