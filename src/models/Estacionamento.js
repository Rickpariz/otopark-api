const { Schema, model } = require('mongoose');

const EstacionamentoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    funcionarios: [{
        type: Schema.Types.ObjectId, ref: 'usuarios'
    }],
    dono: { type: Schema.Types.ObjectId, ref: 'usuarios' },
    numeroDeVagas: {
        type: Number,
        required: true
    },
    vagas: [],
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = model('estacionamentos', EstacionamentoSchema);