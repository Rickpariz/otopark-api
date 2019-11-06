const Estacionamento = require('../models/Estacionamento');
const Vaga = require('../models/Vaga');
const mongoose = require('mongoose');
const utils = require('../utils');

module.exports = {
    async create(req, res) {
        try {
            const { nome, endereco, funcionarios, dono, numeroDeVagas } = req.body;

            if (!nome || !endereco || !dono || !numeroDeVagas) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            let estacionamento = await Estacionamento.create({
                nome,
                endereco,
                funcionarios: funcionarios ? funcionarios.map(f => new mongoose.Types.ObjectId(f)) : [],
                dono: new mongoose.Types.ObjectId(dono),
                numeroDeVagas: numeroDeVagas,
                vagas: []
            })

            let vagas = [];
            let loops = utils.gerarArrayDeObjetos(numeroDeVagas);

            for (const loop of loops) {
                let vaga = await Vaga.create({
                    codigo: utils.gerarHahcode(),
                    estacionamento:  new mongoose.Types.ObjectId(estacionamento._id)
                })

                vagas.push(new mongoose.Types.ObjectId(vaga._id));
            }

            estacionamento.vagas = vagas;

            await estacionamento.save();
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
            const { estacionamento, nome, endereco, funcionarios, dono, numeroDeVagas } = req.body;

            if (!estacionamento || !nome || !endereco || !dono || !numeroDeVagas) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            let esctacionamentoAntigo = await Estacionamento.findOne({_id: new mongoose.Types.ObjectId(estacionamento)}).exec();
            let vagasList = [];

            if (numeroDeVagas > esctacionamentoAntigo.numeroDeVagas){
                let novasVagas = numeroDeVagas - esctacionamentoAntigo.numeroDeVagas
                let loops = utils.gerarArrayDeObjetos(novasVagas);

                for (const loop of loops) {
                    let vaga = await Vaga.create({
                        codigo: utils.gerarHahcode(),
                        estacionamento:  new mongoose.Types.ObjectId(estacionamento._id)
                    })

                    vagasList.push(new mongoose.Types.ObjectId(vaga._id));
                }
            }
            
            let estacionamentoAtualizado = await Estacionamento.findOneAndUpdate({
                _id: new mongoose.Types.ObjectId(estacionamento)
            }, {
                $set: {
                    nome,
                    endereco,
                    funcionarios: funcionarios ? funcionarios.map(f => new mongoose.Types.ObjectId(f)) : [],
                    dono: new mongoose.Types.ObjectId(dono),
                    numeroDeVagas: numeroDeVagas
                },
                $push: {
                    vagas: vagasList
                }
            }, { new: true }).populate('funcionarios').populate('dono').exec();


            return res.json(estacionamentoAtualizado);
        } catch (err) { res.status(500).send(err.message) }
    }
}