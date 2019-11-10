const mongoose = require('mongoose');
const Reserva = require('../models/Reserva');
const Cliente = require('../models/Cliente');
const Vaga = require('../models/Vaga');
const Veiculo = require('../models/Veiculo');

const moment = require('moment');

module.exports = {
    async create(req, res) {
        try {
            const { rg, nome, telefone, placa, modelo, cor, estacionamento, vaga } = req.body;

            if (!nome || !placa || !estacionamento || !vaga) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            let cliente = await Cliente.findOneAndUpdate({rg}, {
                $set: {
                    rg: rg ? rg : '',
                    nome,
                    telefone: telefone ? telefone : '',
                    estacionamento: new mongoose.Types.ObjectId(estacionamento)
                }
            }, { new: true, upsert: true }).exec();

            let veiculo = await Veiculo.findOneAndUpdate({ placa }, {
                $set: {
                    placa,
                    modelo: modelo ? modelo : '',
                    cor: cor ? cor : '464444',
                    cliente: cliente._id,
                    estacionamento: new mongoose.Types.ObjectId(estacionamento)
                }
            }, { new: true, upsert: true })

            await Vaga.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(vaga)}, { $set: {
                status: false
            }}).exec();

            let reserva = await Reserva.create({
                vaga: new mongoose.Types.ObjectId(vaga),
                estacionamento: new mongoose.Types.ObjectId(estacionamento),
                cliente: cliente._id,
                veiculo: veiculo._id,
                entrada: moment().toDate()
            });
            
            reserva = await reserva.populate('cliente')
                .populate('vaga')
                .populate('veiculo')
                .populate('tipo').execPopulate();

            return res.json(reserva);
        } catch (err) { res.status(500).send(err.message) }
    },

    async getAll(req, res) {
        try {

            const reservas = await Reserva.find().populate('cliente')
                .populate('vaga')
                .populate('veiculo')
                .populate('tipo').exec();
            return res.json(reservas);

        } catch (err) { res.status(500).send(err.message) }
    },

    async getOne(req, res) {
        try {
            const { reserva } = req.params;

            if (!reserva) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const reservaEncontrada = await Reserva.findOne({ _id: new mongoose.Types.ObjectId(reserva) }).populate('cliente')
                .populate('vaga')
                .populate('veiculo')
                .populate('tipo').exec();
            return res.json(reservaEncontrada);

        } catch (err) { res.status(500).send(err.message) }
    },

    async update(req, res) {
        try {
            const { reserva, estacionamento, cliente, vaga, veiculo, tipo, entrada, saida, status } = req.body;

            if (!reseva || !veiculo || !vaga || !estacionamento || !tipo || !cliente || !entrada || !saida || !status) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const reservaAtualizada = await Reserva.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(reserva) },
                {
                    $set: {
                        status,
                        vaga: new mongoose.Types.ObjectId(vaga),
                        tipo: new mongoose.Types.ObjectId(tipo),
                        estacionamento: new mongoose.Types.ObjectId(estacionamento),
                        cliente: new mongoose.Types.ObjectId(cliente),
                        veiculo: new mongoose.Types.ObjectId(veiculo),
                        entrada: moment(entrada).toDate(),
                        saida: moment(saida).toDate()
                    }
                }, { new: true })
                .populate('vaga')
                .populate('veiculo')
                .populate('tipo').exec();

            return res.json(reservaAtualizada);
        } catch (err) { res.status(500).send(err.message) }
    }
}