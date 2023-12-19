const mongoose = require('mongoose');
const schema = new mongoose.Schema({

  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String },
  userType: {
    type: String,
    required: true,
    enum: ['normal', 'empresarial', 'professional']
  },
  companyName: { type: String, required: function () { return this.userType === 'empresarial' && this.isOwner; } },
  isOwner: { type: Boolean, required: function () { return this.userType === 'empresarial'; } }, 
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'company', required: function () { return this.userType === 'empresarial' && !this.isOwner; } },
  courses: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Courses' },
  }],
  chatId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chats' }],
  surveys: [{
    surveyInfo: {
        question: String,
        incorrectAnswers: [String],
        correctAnswer: String,
    },
    surveyResult: Number

  }],
  evaluationResults: [{
    courseId: { type: mongoose.Schema.Types.ObjectId},
    result: String
  }],
  paymentInfo: [{
    paymentId: { type: mongoose.Schema.Types.ObjectId},
    paymentData: {
      cardType: String,
      cardNumber: String,
      cardCVV: String,
      cardTitular: String,
      paymentDate: Date,
      paymentValue: Number,
      cardExpirationDate: Date
    }
  }],

}, {timestamps: false});

const users = mongoose.model('users', schema);
module.exports = users;