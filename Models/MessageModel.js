/**
   * This is for the messages Model. {@link link
    name}
    * @author Author/Ntokungwia Zidane
    * @date Aug 20/2020
    * Contributors : contributor name,
 **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema(
  {
    email: String,
    subject: String,
    message: String,
    phone: String,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('messages',messageSchema);