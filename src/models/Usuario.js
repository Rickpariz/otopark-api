const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    estacionamentos: {
        type: Array
    }
}, { timestamps: true });

module.exports = model('Usuario', UsuarioSchema);