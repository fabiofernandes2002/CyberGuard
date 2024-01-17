const mongoose = require('mongoose');
const schema = new mongoose.Schema(
  {
    messages: [
      {
        content: { type: String, required: true },
        username: { type: String },
        userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
        time: { type: Date, default: Date.now },
      },
    ],
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    ],
  },
  { timestamps: false }
);

const chats = mongoose.model('chats', schema);
module.exports = chats;
