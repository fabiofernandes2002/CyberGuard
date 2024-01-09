const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    imgURL: { type: String, required: true },
    description: { type: String, required: true },
    coursesIds: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'courses'
    }]
}, { timestamps: false })

const discoverCourses = mongoose.model('discoverCourses', schema);
module.exports = discoverCourses;