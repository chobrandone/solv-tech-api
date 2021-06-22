/**
   * This is for the user Controler. {@link link
    name}
    * @author Author/Ntokungwia Zidane
    * @date Nov 10/2020
    * Contributors : Ndeme Yvan,
 **/

// models imports
const MessageModel = require("../Models/MessageModel");
const mailer = require("../utils/mailer");
const assurancePlatformModel = require("../Models/AssurancesClientResult");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

/*** A function used to save messages into the database
 *
 * @param res - the response object
 * @param data - the  object containing the email
 * @return has no return value
 *
 * */
module.exports.SaveMessages = (res, data) => {
  let results = new MessageModel(data);
  //console.log(data)
  results.save((err, doc) => {
    if (err) {
      res.json(false);
    } else {
      res.json(true);
    }
  });
};

module.exports.getProductClientById = (res, id) => {
  let message = assurancePlatformModel.findById(id, (err, doc) => {
    if (err) {
      res.json({ message: "error occured" });
    } else {
      res.json(doc);
    }
  });
};

module.exports.getAllProductClientByPhone = (res, phone, page, size) => {
  let pageNumber = page;
  let sizeNumber = size;
  let message = assurancePlatformModel.find(
    { telephone: phone },
    {},
    {
      limit: sizeNumber * 1,
      skip: (pageNumber - 1) * sizeNumber,
      sort: { createdAt: -1 },
    },
    (err, doc) => {
      if (err) {
        res.json({ message: "false" });
      } else {
        let data = {};
        assurancePlatformModel
          .find({ telephone: phone })
          .countDocuments((err, num) => {
            data.total = num;
            data.page = pageNumber;
            data.size = sizeNumber;
            data.totalNumberOfPages = Math.ceil(num / size);
            data.data = doc;
            res.json(data);
          });
      }
    }
  );
};

module.exports.getAllClientSouscryptionByPhoneAndType = (
  res,
  phone,
  page,
  size,
  type
) => {
  let pageNumber = page;
  let sizeNumber = size;
  let message = assurancePlatformModel.find(
    { telephone: phone, type: type },
    {},
    {
      limit: sizeNumber * 1,
      skip: (pageNumber - 1) * sizeNumber,
      sort: { createdAt: -1 },
    },
    (err, doc) => {
      if (err) {
        res.json({ message: "false" });
      } else {
        let data = {};
        assurancePlatformModel
          .find({ telephone: phone, type: type })
          .countDocuments((err, num) => {
            data.total = num;
            data.page = pageNumber;
            data.size = sizeNumber;
            data.totalNumberOfPages = Math.ceil(num / size);
            data.data = doc;
            res.json(data);
          });
      }
    }
  );
};

module.exports.getAllSpecificClientType = (res, type, page, size) => {
  let pageNumber = parseInt(page);
  let sizeNumber = parseInt(size);
  assurancePlatformModel.find(
    { type: type },
    {},
    {
      limit: sizeNumber * 1,
      skip: (pageNumber - 1) * sizeNumber,
      sort: { createdAt: -1 },
    },
    (err, doc) => {
      if (err) {
        res.json({ message: "false" });
      } else {
        let data = {};
        data.total = doc.length;
        data.page = pageNumber;
        data.size = sizeNumber;
        data.totalNumberOfPages = Math.ceil(doc.length / size);
        data.data = doc;
        res.json(data);
      }
    }
  );
};

module.exports.sendReceptionEmail = (data, res) => {
  var merci ="Activa vous remercie de votre confiance "
  var from = "activanoreply@gmail.com";
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    secure: true,
    post: 465,
    auth: {
      user: from,
      pass: "minipol88888",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = "";
  if (data.type == "Automobile") {
    const {
      Accessories,
      AccessoriesTax,
      Amount,
      Coverages,
      Name_EN,
      Tax,
      NetPremium,
      ExtraBillings,
      type,
      email,
      prospectname,
    } = data;
    console.log("email :", email);
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        res.json({
          status: false,
        });
      } else {
        console.log("Server is ready to take our messages", success);
      }
    });

    var x = "",
      i;
    Coverages.forEach((element) => {
      x =
        x +
        `
        <tr>
          <td style="padding:5px;">${element.CoverageName}</td>
          <td style="padding:5px;"> ${formatPrice(element.Capital)} FCFA</td>
        </tr>
      `;
    });

    mailOptions = {
      from: from,
      to: email,
      subject: `Activa Souscription au produit  : Automobile`,
      text: "Newly assured customer ",
      html: `

      <p>Cher Monsieur <strong>${prospectname.toUpperCase()}</strong>, ci-dessous la cotation de votre <strong>assurance Automobile</strong> :
      <br> 
    <h4>PACK CHOISI : ${Name_EN.toUpperCase()}</h2>
    <h4>PRIME NET : ${formatPrice(NetPremium)} FCFA</h2>
    <h4>ACCESSOIRES : ${formatPrice(Accessories)} FCFA</h2>
    <h4>FICHIER CENTRAL : ${formatPrice(ExtraBillings[1].Amount)} FCFA</h2>
    <h4>TVA  : ${formatPrice(Tax)} FCFA</h2>
    <h4>CARTE ROSE : ${formatPrice(ExtraBillings[2].Amount)} FCFA</h2>
    <h4>DTA : ${formatPrice(ExtraBillings[0].Amount)} FCFA</h2>     
    <h4>MONTANT TOTAL : ${formatPrice(Amount)} FCFA</h2>
    <br>
    <br>

    <p>Liste des Garanties :
    <table style="width:30%;" border="1" cellpadding="0" cellspacing="0">
    <tr>
    <th>Garanties</th>
    <th>Capitaux</th>
  </tr>
      ${x}
      </table>
      <p>${merci}</p>
      `,
    };
  } else if (data.type == "multirisque") {
    const { type, produit, option, montant, email, prospectname ,assurances} = data;
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        res.json({
          status: false,
        });
      } else {
        console.log("Server is ready to take our messages", success);
      }
    });

    assurances.forEach((element) => {
      var y = "";
      element.franchise.forEach((element) => {
        y = y+` 
        <small>
         ${element}
        </small>
      `;
        });

      x = x +
        `<tr>
          <td style="padding:5px;">${element.name}</td>
          <td style="padding:5px;"> ${element.capital}</td>
          <td style="padding:5px;"> ${y} </td>
        </tr>
      `;
    });

    mailOptions = {
      from: from,
      to: email,
      subject: `Activa Souscription au produit  : ${produit}`,
      text: "Newly assured customer ",
      html: `
      <p>Cher Monsieur <strong>${prospectname.toUpperCase()}</strong>,  ci-dessous la cotation de votre assurance <strong>${produit}</strong> :
      <br>
    <h4>PRODUIT : ${produit.toUpperCase()}</h2>
    <h4>OPTION : ${option}</h2>
    <h4>MONTANT TOTAL : ${formatPrice(montant)} FCFA</h2>
    <br>
    <p>Liste des Garanties :
    <table border="1" cellpadding="0" cellspacing="0">
    <tr>
    <th>Garanties</th>
    <th>Capitaux</th>
    <th>Franchises</th>
  </tr>
      ${x}
      </table>
      <br>
      <p>${merci}</p>
      `,
    };
  } else if (data.type == "condoleance") {
    const {
      type,
      produit,
      montant,
      email,
      nbrPersonne,
      tableauPersonnes,
      taxe,
      totalHT,
      prospectname,
    } = data;
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        res.json({ status: false });
      } else {
        console.log("Server is ready to take our messages", success);
      }
    });
    var x = "",
      i;
    tableauPersonnes.forEach((element) => {
      x =
        x +
        `<tr>
          <td>${element.name}</td>
          <td>${formatPrice(element.capital)} FCFA</td>
          <td>${element.relation}</td>
        </tr>
      `;
    });
    mailOptions = {
      from: from,
      to: email,
      subject: `Activa Souscription au produit  : ${produit}`,
      text: "Newly assured customer ",
      html: `

      <p>Cher Monsieur <strong>${prospectname.toUpperCase()}</strong>,ci-dessous la cotation de votre assurance <strong>${produit}</strong> :
      <br>
    <h4>PRODUIT : ${produit.toUpperCase()}</h2>
    <h4>GARANTIE : ASSURANCE DÉCÈS </h2>
    <h4>NOMBRE PERSONNE : ${formatPrice(nbrPersonne)}</h2>
    <h4>TAXE : ${formatPrice(taxe)}    FCFA</h2>
    <h4>TOTAL HT : ${formatPrice(totalHT)}  FCFA</h2>
    <h4>MONTANT TOTAL TTC : ${formatPrice(montant)} FCFA</h2>
    <br>
    <br>
    <p>Liste des personnes que vous voulez assurer :
    <table style="width:30%;text-align:center;" border="1" cellpadding="0" cellspacing="0">
    <tr>
    <th>Assuré(s)</th>
    <th>Capitaux</th>
    <th>Relations</th>
  </tr>
    ${x}
    </table>
    <p>${merci}</p>
  `,
    };
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.json({
        status: false,
      });
    } else {
      res.status(200).json({
        status: true,
      });
      console.log("Message sent", info.messageId);
    }
  });
};

const formatPrice = (value) => {
  let val = (value / 1).toFixed(0).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
