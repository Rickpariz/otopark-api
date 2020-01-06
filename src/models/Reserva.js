const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ReservaSchema = new Schema({
    status: {
        type: String, // Aberta / Feachada / Cancelada
        required: true,
        default: 'Aberta',
        enum: ['Aberta', 'Fechada', 'Cancelada']
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
        type: String,
        enum: ['Avulsa', 'Diaria', 'Mensal'],
        default: 'Avulsa',
    },
    preco: { type: Number }
}, { timestamps: true });

ReservaSchema.plugin(mongoosePaginate);

module.exports = model('reservas', ReservaSchema);