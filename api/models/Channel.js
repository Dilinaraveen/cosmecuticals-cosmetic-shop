const mongoose = require('mongoose');
const ChannelSchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true, "can't be blank"]
  },
  userName: {
    type: String,
    required: [true, "can't be blank"]
  },
  userEmail: {
    type: String,
    required: [true, "can't be blank"]
  },
  description: {
    type: String,
    required: [true, "can't be blank"]
  },
  doctorId: {
    type: String
  },
  doctorName: {
    type: String
  },
  answer: {
    type: String
  }
 
}, {minimize: false});

const Channel = mongoose.model('Channel', ChannelSchema);

module.exports = Channel;
