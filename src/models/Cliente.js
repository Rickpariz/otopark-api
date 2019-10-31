const { Schema, model } = require('mongoose');

const ClienteSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    rg: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    estacionamento: { 
        type: Schema.Types.ObjectId, ref: 'estacionamentos', required: true
    }
}, { timestamps: true });

module.exports = model('clientes', ClienteSchema);