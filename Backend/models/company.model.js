const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    
    name: { type: String, required: true, unique: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    users: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
            difficulty: { type: String, required: true },
        }
    ],

}, { timestamps: false });

const companies = mongoose.model('companies', schema);
module.exports = companies;