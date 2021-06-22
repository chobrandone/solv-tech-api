"use strict";
const dotenv = require('dotenv');
dotenv.config();

// module.exports.mailer = function  (data) {
module.exports.mailer = function (data) {
  let path = require("path");
  const nodemailer = require("nodemailer");
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: process.env.SENDER_EMAIL_SERVICE,
      //  port: 587,
      // secure: false, // true for 465, false for other ports
      auth: {
        user:process.env.SENDER_EMAIL, // generated ethereal user
        pass: process.env.SENDER_EMAIL_PASSWORD, // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from:process.env.SENDER_EMAIL, // sender address
      to: data.email, // list of receivers
      subject: "Devis Activa", // Subject line
      attachments: [
        {
          filename: "logo.png",
          path: path.join(__dirname, "./logo.png"),
          cid: "unique@kreata.ee", //same cid value as in the html img src
        },
      ],
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Payment status</title>
    <style>
  @media (min-width: 240px) {
  .one {
    display: inline;
  }
  .headquestion {
    display: block;
  }
  .numberingtwo {
    display: none;
  }
  #content .button {
    width: 100%;
  }
  .headimg img {
    display: none;
  }
  #content .item {
    margin-right: 20px;
    margin-left: 20px;
  }
  #content .loader {
    margin-top: 190px;
  }
}
@media (min-width: 280px) {
  #content .button {
    width: 100%;
  }
  .loader {
    margin-top: 152px;
  }
  #content .item {
    margin-right: 20px;
    margin-left: 20px;
  }
}
@media (min-width: 320px) {
  #content .button {
    width: 100%;
  }
  #content .loader {
    margin-top: 190px;
  }
  #content .item {
    margin-right: 20px;
    margin-left: 20px;
  }
}
@media (min-width: 360px) {
  #content .button {
    width: 100%;
  }
  #content .loader {
    margin-top: 190px;
  }
  #content .item {
    margin-right: 20px;
    margin-left: 20px;
  }
}
@media (min-width: 375px) {
  #content .button {
    width: 100%;
  }
  .loader {
    margin-top: 249px;
  }
}
@media (min-width: 411px) {
  #content .button {
    width: 100%;
  }
  .loader {
    margin-top: 254px;
  }
}
@media (min-width: 450px) {
  #content .button {
    width: 100%;
  }
  .loader {
    margin-top: 180px;
  }
}
@media (min-width: 480px) {
  #content .button {
    width: 100%;
  }
  .loader {
    margin-top: 263px;
  }
}
@media (min-width: 600px) {
  .loader {
    margin-bottom: 126px;
    margin-top: 100px;
  }
  #content .body {
    min-height: 0 !important;
  }
  #content .element {
    margin-top: 60px;
  }
  #content .question {
    margin-bottom: 50px;
  }
}
@media (min-width: 640px) {
  .headimg img {
    display: none;
  }
  .loader {
    margin-top: 90px;
  }
}
@media (min-width: 768px) {
  .loader {
    margin-top: 348px;
  }
  img {
    vertical-align: middle;
    border-style: none;
    width: 216px;
  }
  p {
    text-align: center;
    font-size: 11px;
  }
  .headimg img {
    display: none;
  }
  #content .item {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
}
@media (min-width: 800px) {
  #content .button {
    width: 100%;
  }
  .loader {
    margin-bottom: 126px;
    margin-top: 100px;
  }
  #content .body {
    min-height: 0 !important;
  }
  .headimg img {
    display: none;
  }
  #content .item {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
}
@media (min-width: 1000px) {
  .headimg img {
    display: none;
  }
  .numberingtwo {
    display: unset;
    margin-top: 20px;
    margin-right: 20px;
  }
  .one {
    display: none;
  }
  .headquestion {
    display: flex;
    justify-content: center;
    text-align: center;
  }
  #content .button {
    width: 20%;
  }
  .loader {
    margin-bottom: 126px;
    margin-top: 100px;
  }
  #content .body {
    min-height: 78vh !important;
  }
  #content .element {
    margin-top: 60px;
  }
  #content .question {
    margin-bottom: 50px;
  }
  #content .item {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  #content .head {
    display: flex;
    justify-content: space-between;
  }
}
@media (min-width: 1028px) {
  .headimg img {
    width: 45px;
    display: unset;
  }
  .numberingtwo {
    display: unset;
    margin-top: 20px;
    margin-right: 20px;
  }
  .one {
    display: none;
  }
  .headquestion {
    display: flex;
    justify-content: center;
    text-align: center;
  }
  #content .button {
    width: 20%;
  }
  .loader {
    margin-bottom: 126px;
    margin-top: 100px;
  }
  #content .body {
    min-height: 78vh !important;
  }
  #content .element {
    margin-top: 60px;
  }
  #content .question {
    margin-bottom: 50px;
  }
  #content .item {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  #content .head {
    display: flex;
    justify-content: space-between;
  }
}
@media (min-width: 1440px) {
  #content .button {
    width: 10%;
  }
  .loader {
    margin-top: 318px;
  }
}
#content .head {
  min-height: 5vh;
}
#content .body {
  min-height: 75vh;
}
#content .body .question {
  font-family: Dosis !important;
}
#content {
  background: linear-gradient(rgb(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
    url(../../assets/img/activabg.png);
  background-size: cover;
  font-family: Dosis;
}
.content {
  font-family: Dosis;
}
#content .body {
  min-height: 70vh;
}
#content .body .question {
  padding-top: 20px;
}
.item {
  cursor: pointer;
  font-family: Dosis !important;
  color: #2d3c7f;
}
h4 {
  color: #343a40;
}
.button {
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s;
}
#content .button:hover {
  background-color: #81bc00;
  border: 2px solid #81bc00;
  transform: scale(1.1);
}
hr {
  background-color: #81bc00;
  height: 1px;
}
.question {
  color: #2d3c7f;
  font-weight: 600;
  font-size: 4rem;
}
#content .item {
  transition: transform 0.2s;
  cursor: pointer;
}
#content .item:hover {
  background-color: #fde8d4;
  border: 2px solid #fff4eb;
  transition: all 0.5s ease-in-out;
  color: #2d3c7f;
}
.stepNumber {
  font-size: 40px;
  font-weight: 700;
  background-color: #2d3c7f;
  color: #fff;
  border: 0 solid #2d3c7f;
  border-radius: 50%;
  padding: 10px 30px;
}
.confirmation {
  background: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
  padding: 13px;
  padding-top: 16px;
}
.first hr {
  background-color: #343a40;
  height: 0;
  border: 1px solid #000;
}
.first h1 {
  color: #2d3c7f;
  font-weight: 600;
  font-size: 40px;
}
.first {
  padding-left: 20px;
}
.vehicule label {
  color: #2d3c7f;
  font-size: 20px;
  font-weight: 600;
}
.vehicule i {
  color: red;
  font-size: 10px;
}
.vehicule input {
  height: 5rem;
  font-size: 16px;
}
label:first-child input[type="radio"] {
  width: 30px;
  height: 30px;
}
.lastbutton {
  border: 2px solid #2d3c7f;
  color: #fff;
  padding: 10px 20px;
  background-color: #2d3c7f;
  cursor: pointer;
  transition: transform 0.2s;
  min-width: 230px;
  font-size: 17px;
}
.lastbutton:hover {
  background-color: #81bc00;
  border: 2px solid #81bc00;
  transform: scale(1.1);
}
small {
  font-size: 15px;
}
.loading {
  margin-top: 20px;
  font-size: 20px;
}
  </style>
  </head>

  <body>
  
      <div class="confirmation">
      <img src="cid:unique@kreata.ee" height="60"/>
      <h1> Hello Mr/Mrs, ${data.name}</h1>
      <br>
      <p> Thank you for estimating your quote on our application.</p>
      ${data.html}
      <p> Activa Thanks you.</p>
      </div>
    <script
      src="https://kit.fontawesome.com/77f730218d.js "
      crossorigin="anonymous "
    ></script>
  </body>

</html>
`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
};
