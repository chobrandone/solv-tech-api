/**
   * This is for the Admin Controler. {@link link
    name}
    * @author Author/Ndeme Yvan
    * @date Aug 10/2020
    * Contributors : Ndeme Yvan,
 **/

// models imports
const assurancePlatformModel = require("../Models/AssurancesClientResult");
const { query } = require("express");
const MessageModel = require("../Models/MessageModel");
const mailer = require("../utils/mailer");

/*** A function used to make a new assurance client assurance result from the database
 *
 * @param res - the response object
 * @param data - the data object
 * @return has no return value
 *
 * */
module.exports.saveClientAssuranceResult = (res, data) => {
  // console.log(data.email);
  // mailer.mailer(data);
  let result = new assurancePlatformModel(data);
  result.save((err, doc) => {
    if (err) {
      res.json({status:false});
    } else {
      res.json({ id: doc._id, status: true });
    }
  });
};

/*** A function used to get a new assurance client assurance result from the database
 *
 * @param res - the response object
 * @param page - the page you want
 * @param size - the numner of item you want
 * @return has no return value
 *
 * */
module.exports.getAssuranceClientResult = (res, page, size) => {
  // get all questions having that platform id here
  let pageNumber = parseInt(page);
  let sizeNumber = parseInt(size);
  let result = assurancePlatformModel.find(
    {},
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
        assurancePlatformModel.find().countDocuments((err, num) => {
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

/*** A function To obtain all the insurances which have been subscribed by a user thanks to his telephone number
 *
 * @param res - the response object
 * @param page - the page you want
 * @param phone - the suscriber phone number
 * @param size - the numner of item you want
 * @return has no return value
 *
 * */
module.exports.getAllSpecificClientSubcribe = (res, phone) => {
  let result = assurancePlatformModel.find({ telephone: phone }, (err, doc) => {
    if (err) {
      res.json({ status: false });
    } else {
      res.json(doc);
    }
  });
};

/*** A function To obtain all the insurances according to a type
 *
 * @param res - the response object
 * @param page - the page you want
 * @param size - the numner of item you want
 * @return has no return value
 *
 * */
module.exports.getAllSpecificClientType = (res, type, page, size) => {
  let pageNumber = parseInt(page);
  let sizeNumber = parseInt(size);
  let result = assurancePlatformModel.find(
    { type: type },
    {},

    {
      limit: sizeNumber * 1,
      skip: (pageNumber - 1) * sizeNumber,
      sort: { createdAt: -1 },
    },
    (err, doc) => {
      if (err) {
        res.json({ status: false });
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


/*** A function used to edit a assurance choise by client in the database
 *
 * @param res - the response object
 * @param data - the data object of the question
 * @return has no return value
 *
 * */
module.exports.editAssuranceClientResult = (res, data, id) => {
  // edit the platform here
  let result = assurancePlatformModel.findByIdAndUpdate(
    _id,
    data,
    (err, doc) => {
      if (err) {
        res.json({status:false});
      } else {
        res.json({status:true});
      }
    }
  );
};

module.exports.editPaymentStatusAssuranceClientResult = (res, data, id) => {
  assurancePlatformModel.findByIdAndUpdate(
    id,
    { "statusPayment": data.statusPayment, "status": data.status },
    (err, doc) => {
      if (err) {
        res.json({status:false});
      } else {
        res.json({status:true});
      }
    }
  );
};
module.exports.removeNestedField = (res,id) => {
  assurancePlatformModel.findByIdAndUpdate(
    id,
    { $unset: {"sessionResponse.isDownloadAttestation":"","sessionResponse.isDownloadCarteRose":""}  },
    (err, doc) => {
      if (err) {
        res.json({status:false});
      } else {
        res.json({status:true});
      }
    }
  );

};
module.exports.editCarteRoseAndAttestation = (res, type, data,id) => {
  if (type=="AT") {
    assurancePlatformModel.findByIdAndUpdate(
      id,
      { "isDownloadAttestation": data.status,  },
      (err, doc) => {
        if (err) {
          res.json({status:false});
        } else {
          res.json({status:true});
        }
      }
    );
  } else  {
    assurancePlatformModel.findByIdAndUpdate(
      id,
      { "isDownloadCarteRose": data.status},
      (err, doc) => {
        if (err) {
          res.json({status:false});
        } else {
          res.json({status:true});
        }
      }
    );
  }
 
};

/*** A function used to delete a client assurance from the database
 *
 * @param res - the response object
 * @param id - the id of the brand
 * @return has no return value
 *
 * */
module.exports.removeClientAssuranceResult = (res, id) => {
  assurancePlatformModel.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      res.json({ message: "error occured" });
    } else {
      if (doc != null) {
        res.json({ message: true });
      } else {
        res.json({ message: false });
      }
    }
  });
};




// /*** A function used to edit a client user assurance response in the database
//  *
//  * @param res - the response object
//  * @param data - the data object of the question
//  * @return has no return value
//  *
//  * */
// module.exports.editAssuranceClientResult = (res, data, id) => {
//   // edit the platform here
//   let result = assurancePlatformModel.findByIdAndUpdate(
//     id,
//     data,
//     (err, doc) => {
//       if (err) {
//         res.json(false);
//       } else {
//         res.json(true);
//       }
//     }
//   );
// };


// Authentictoin methods

/*** A function get the admin from the database
 *
 * @param res - the response object
 * @param data - the username and password object
 * @return has no return value
 *
 * */
module.exports.login = (res, data) => {
  // save the data here
  data.status = true;
  res.json(data);
};

/*** A function to logout admin
 *
 * @param res - the response object
 * @param data - the username and password object
 * @return has no return value
 *
 * */
module.exports.logout = (res, data) => {
  // save the data here
  res.json({ message: "user logout" });
};

// get messages

/*** A function get all messages from the database
 *
 * @param res - the response object
 * @return has no return value
 *
 * */
module.exports.getMessages = (res) => {
  let messages = MessageModel.find((err, doc) => {
    if (err) {
      res.json({ message: "false" });
    } else {
      res.json(doc);
    }
  });
};

/*** A function used to dellete a message from the database
 *
 * @param res - the response object
 * @param id - the id of the message
 * @return has no return value
 *
 * */
module.exports.removeMessage = (res, id) => {
  let message = MessageModel.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      res.json({ message: "error occured" });
    } else {
      if (doc != null) {
        res.json({ status: true });
      } else {
        res.json({ status: false });
      }
    }
  });
};




