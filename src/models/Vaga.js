const { Schema, model } = require('mongoose');

const VagaSchema = new Schema({
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    codigo: {
        type: String,
        required: true
    },
    estacionamento: { 
        type: Schema.Types.ObjectId, ref: 'estacionamentos', required: true
    }
}, { timestamps: true });

module.exports = model('vagas', VagaSchema);