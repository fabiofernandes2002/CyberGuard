const mongoose = require('mongoose');
const schema = new mongoose.Schema({

  idDiscover: { type: mongoose.Schema.Types.ObjectId, ref: 'discoverCourses' },
  name: { type: String, required: true },
  // paid = true -> Curso pago | paid = false -> Curso gratuito
  nameCourse: { type: String, required: true },
  paid: { type: Boolean, default: false }, 
  price: { type: Number, required: function () { return this.paid; } },
  imgURL: { type: String, require: true, },
  videos: [{
    videoURL: String,
    title: String,
    duration: Number,
  }],
  description: { type: String, required: true },
  evaluations: [{
    questions: [{
      question: String,
      answers: [String],
      correctAnswerIndex: Number
    }]
  }],
  feedbacks: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    stars: { type: Number, min: 1, max: 5, default: 1 },
  }],
  rating: { type: Number, min: 1, max: 5, default: 1 },

}, { timestamps: false });

const courses = mongoose.model('courses', schema);
module.exports = courses;
