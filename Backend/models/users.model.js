const mongoose = require('mongoose');
const schema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String },
    photo: { type: String, default: 'http://avatars.adorable.io/' },
    totalCoursesCompleted: { type: Number, default: 0 },
    pontuationMediaEvaluation: { type: Number, default: 0 },
    userType: {
      type: String,
      required: true,
      enum: ['normal', 'empresarial', 'professional', 'admin'],
    },
    companyName: {
      type: String,
      required: function () {
        return this.userType === 'empresarial' && this.isOwner;
      },
    },
    isOwner: {
      type: Boolean,
      required: function () {
        return this.userType === 'empresarial';
      },
    },
    company: {
      type: String,
      required: function () {
        return this.userType === 'empresarial' && !this.isOwner;
      },
    },
    courses: [
      {
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'courses' },
        started: { type: Boolean, default: false },
        startedDate: { type: Date, default: Date.now },
        finishedDate: { type: Date, default: null },
        finished: { type: Boolean, default: false },
        evaluationScore: { type: Number, default: 0 },
      },
    ],
    chatId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chats' }],
    surveys: [
      {
        surveyInfo: {
          question: String,
          incorrectAnswers: [String],
          correctAnswer: String,
        },
        surveyResult: Number,
      },
    ],
    evaluationResults: [
      {
        courseId: { type: mongoose.Schema.Types.ObjectId },
        result: String,
      },
    ],
    paymentInfo: [
      {
        paymentId: { type: mongoose.Schema.Types.ObjectId },
        paymentData: {
          cardType: String,
          cardNumber: String,
          cardCVV: String,
          cardTitular: String,
          paymentDate: Date,
          paymentValue: Number,
          cardExpirationDate: Date,
        },
      },
    ],
  },
  { timestamps: false }
);

const users = mongoose.model('users', schema);
module.exports = users;
