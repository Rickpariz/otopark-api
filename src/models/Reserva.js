const { Schema, model } = require('mongoose');

const ReservaSchema = new Schema({
    status: {
        type: String, // Aberta / Feachada / Cancelada
        required: true,
        default: 'Aberta'
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'clientes',
        required: true
    },
    vaga: {
        type: Schema.Types.ObjectId,
        ref: 'vagas',
        required: true
    },
    veiculo: {
        type: Schema.Types.ObjectId,
        ref: 'veiculos',
        required: true
    },
    estacionamento: {
        type: Schema.Types.ObjectId,
        ref: 'estacionamentos',
        required: true
    },
    entrada: {
        type: Date,
        required: true
    },
    saida: { type: Date },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'tabeladeprecos',
        required: true
    }
}, { timestamps: true });

module.exports = model('reservas', ReservaSchema);