const { Schema, model } = require('mongoose');

const VeiculoSchema = new Schema({
    placa: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    cor: {
        type: String,
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId, ref: 'clientes',
        required: true
    },
    estacionamento: {
        type: Schema.Types.ObjectId, ref: 'estacionamentos',
        required: true
    }
}, { timestamps: true });

module.exports = model('veiculos', VeiculoSchema);