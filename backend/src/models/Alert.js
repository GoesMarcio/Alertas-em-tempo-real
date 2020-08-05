const mongoose = require('mongoose');
const User = require('./User');

const AlertSchema = new mongoose.Schema({
    title: String,
    text: String,
    type: String,
    date: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    toJSON:{
        virtuals: true,
    }
});

AlertSchema.virtual('date_exhibition').get(function(){
    return new Date(this.date * 1000).toLocaleString("pt-BR");
});



module.exports = mongoose.model('Alert', AlertSchema);