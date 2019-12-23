const mongoose = require('mongoose');
const Reserva = require('../models/Reserva');
const Cliente = require('../models/Cliente');
const Vaga = require('../models/Vaga');
const Veiculo = require('../models/Veiculo');
const { RESERVAS_STATUS } = require('../helpers/reservas');
const moment = require('../helpers/moment');

module.exports = {
    async create(req, res) {
        try {
            const { rg, nome, telefone, placa, modelo, cor, estacionamento, vaga, tipo } = req.body;

            if (!nome || !placa || !estacionamento || !vaga, !tipo) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            let cliente = await Cliente.findOneAndUpdate({ rg }, {
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

            await Vaga.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(vaga) }, {
                $set: {
                    status: false
                }
            }).exec();

            let reserva = await Reserva.create({
                vaga: new mongoose.Types.ObjectId(vaga),
                estacionamento: new mongoose.Types.ObjectId(estacionamento),
                cliente: cliente._id,
                veiculo: veiculo._id,
                entrada: moment().toDate(),
                tipo
            });

            reserva = await reserva.populate('cliente')
                .populate('vaga')
                .populate('veiculo')
                .execPopulate();

            return res.json(reserva);
        } catch (err) { res.status(500).send(err.message) }
    },

    async getAll(req, res) {
        try {
            const { filters } = req.query;
            let query = {};

            if (filters && filters.estacionamento) query['estacionamento'] = new mongoose.Types.ObjectId(filters.estacionamento);
            if (filters && filters.status) query['status'] = filters.status;

            const reservas = await Reserva.find(query).populate('cliente')
                .populate('vaga')
                .populate('veiculo')
                .exec();
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
                .exec();

            if (!reservaEncontrada) return res.status(412).send('Reserva não encontrada');

            return res.json(reservaEncontrada);

        } catch (err) { res.status(500).send(err.message) }
    },

    async update(req, res) {
        try {
            const { reserva, estacionamento, cliente, vaga, veiculo, tipo, entrada, saida, status } = req.body;

            if (!reserva || !veiculo || !vaga || !estacionamento || !tipo || !cliente || !entrada || !saida || !status) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const reservaAtualizada = await Reserva.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(reserva) },
                {
                    $set: {
                        status,
                        vaga: new mongoose.Types.ObjectId(vaga),
                        tipo,
                        estacionamento: new mongoose.Types.ObjectId(estacionamento),
                        cliente: new mongoose.Types.ObjectId(cliente),
                        veiculo: new mongoose.Types.ObjectId(veiculo),
                        entrada: moment(entrada).toDate(),
                        saida: moment(saida).toDate()
                    }
                }, { new: true })
                .populate('vaga')
                .populate('veiculo')
                .exec();

            return res.json(reservaAtualizada);
        } catch (err) { res.status(500).send(err.message) }
    },

    async delete(req, res) {
        try {
            const { reserva } = req.body;

            if (!reserva) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            let reservaEncontrada = await Reserva.findOne({ _id: new mongoose.Types.ObjectId(reserva) }).exec();

            if (!reservaEncontrada) {
                return res.status(500).send('Reserva não encontrada');
            }

            // deixando vaga disponivel 
            let vaga = await Vaga.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(reservaEncontrada.vaga) }, {
                $set: {
                    status: true
                }
            }, { new: true }).exec();

            await Reserva.deleteOne({ _id: new mongoose.Types.ObjectId(reserva) }).exec();

            return res.json({
                reserva,
                vaga
            });

        } catch (err) { res.status(500).send(err.message) }
    },

    async finalizarReserva(req, res) {
        try {
            const { reserva, preco } = req.body

            if (!reserva || !preco) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            let reservaAtualizada = await Reserva.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(reserva) }, {
                $set: {
                    status: RESERVAS_STATUS.FECHADA,
                    saida: moment().toDate(),
                    preco: parseFloat(preco).toFixed(2)
                }
            }, { new: true })
                .exec();


            await Vaga.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(reservaAtualizada.vaga) }, {
                $set: {
                    status: true
                }
            }, { new: true }).exec();

            reservaAtualizada = await reservaAtualizada.populate('cliente')
                .populate('vaga')
                .populate('veiculo')
                .execPopulate();

            return res.json(reservaAtualizada)

        } catch (err) { res.status(500).send(err.message) }
    },

    async buscarReservasParaComprovanteDigital(req, res) {
        try {
            const { rg, estacionamento } = req.query;

            if (!rg) return res.status(500).send('Informações não enviadas para o servidor');

            const cliente = await Cliente.findOne({ rg }).lean().exec();

            if (!cliente) return res.status(412).send('Verifique o RG novamente, usuário não encontrado.');

            const reservas = await Reserva.find({ cliente: new mongoose.Types.ObjectId(cliente._id), estacionamento: new mongoose.Types.ObjectId(estacionamento) })
                                .populate('cliente').populate('veiculo').populate('vaga').sort({entrada: -1}).lean().exec();

            return res.json(reservas);
        } catch (err) { res.status(500).send(err.message) }
    }
}