const mongoose = require('mongoose');
const schema = new mongoose.Schema({

  name: { type: String, required: true },
  // paid = true -> Curso pago | paid = false -> Curso gratuito
  paid: { type: Boolean, default: true }, 
  price: { type: Number, required: function () { return this.paid; } },
  videoUrl: { type: String, required: true },
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
    stars: { type: Number, min: 1, max: 5 },
  }],
  rating: { type: Number, min: 1, max: 5 }

}, { timestamps: false });

const courses = mongoose.model('courses', schema);
module.exports = courses;