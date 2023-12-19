const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    
    messages: [{
        content: { type: String, required: true },
        userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
        time: { type: Date, default: Date.now }, 
    }],

}, { timestamps: false });

const chats = mongoose.model('chats', schema);
module.exports = chats;