/**
   * This is for the email Model. {@link link
    name}
    * @author Author/Ndeme yvan
    * @date Aug 10/2020
    * Contributors : contributor name,
 **/

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var assuramceSchema = new Schema(
  {
    name: String,
    telephone: String,
    application: String,
    montant: String,
    statusPayment: String,
    status: Boolean,
    paymentMethod: String,
    isDownloadAttestation: Boolean,
    isDownloadCarteRose: Boolean,
    type: String,
    response: Schema.Types.Mixed,
    sessionResponse: Schema.Types.Mixed,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("assuranceClientResult", assuramceSchema);
