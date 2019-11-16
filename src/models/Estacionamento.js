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
    vagas: [{
        type: Schema.Types.ObjectId,
        ref: 'vagas'
    }],
    status: {
        type: Boolean,
        default: true
    },
    avulso: {
        horaFixa: { type: Number },
        horaExcedente: { type: Number },
        tolerancia: { type: Number }
    },
    diario: {
        tempo: { type: Number },
        precoDiaria: { type: Number },
        horaExcedente: { type: Number },
        tolerancia: { type: Number }
    }
}, { timestamps: true });

module.exports = model('estacionamentos', EstacionamentoSchema);