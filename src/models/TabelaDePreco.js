const { Schema, model } = require('mongoose');

const TabelaDePrecoSchema = new Schema({
    tempo: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    estacionamento: { 
        type: Schema.Types.ObjectId, ref: 'estacionamentos', required: true
    }
}, { timestamps: true });

module.exports = model('tabeladeprecos', TabelaDePrecoSchema);