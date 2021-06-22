/**
   * This is for the user routes. {@link link
    name}
    * @author Author/Ntokungwia Zidane
    * @date Nov 20/2020
    * Contributors : Ndeme yvan,
 **/

const express = require("express");
const router = express.Router();
const userController = require("../Controllers/User");
const adminController = require("../Controllers/Admin");

/**
 * To save a user's insurance results at the end of an operation
  post request.
  Endpoint: user/assuranceClientResult
**/
router.post("/assuranceClientResult", (req, res) => {
  let data = {};
  data.name = req.body.name;
  data.telephone = req.body.telephone;
  data.application = req.body.application;
  data.montant = req.body.montant;
  data.status = req.body.status;
  data.paymentMethod = req.body.paymentMethod;
  data.isDownloadAttestation = req.body.isDownloadAttestation;
  data.isDownloadCarteRose = req.body.isDownloadCarteRose;
  data.statusPayment = req.body.statusPayment;
  data.type = req.body.type;
  data.response = req.body.response;
  data.email = req.body.email;
  data.sessionResponse = req.body.sessionResponse;
  adminController.saveClientAssuranceResult(res, data);
});

/**
 * collects all insurance policies taken out by a client
 * get request.
 * Endpoint: user/assuranceClientResult
 **/
router.get("/assuranceClientResult", (req, res) => {
  let page = req.query.page;
  let size = req.query.size;
  adminController.getAssuranceClientResult(res, page, size);
});

/*
  Recover a document subscribed by a client thanks to the id of the document in question
 * get request.
 * Endpoint: user/assuranceClientResult/idOfTheDoc
*/
router.get("/assuranceClientResult/:id", (req, res) => {
  let id = req.params.id;
  userController.getProductClientById(res, id);
});

/*
  Retrieve all products subscribed by a user by phone number
  * get request.
 * Endpoint: user/assuranceClientResult/products/customerPhoneNumber
*/
router.get("/assuranceClientResult/products/:phone", (req, res) => {
  let phone = req.params.phone;
  let page = req.query.page;
  let size = req.query.size;
  userController.getAllProductClientByPhone(res, phone, page, size);
});

/**
 * All subscriptions of type subscript by a user by
 * phone number query param ?type=Automobile for example
 * get request.
 * Endpoint: user/assuranceClientResult/clientType/:phone?type=Type=Automobile
 */
router.get("/assuranceClientResult/clientType/:phone", (req, res) => {
  let phone = req.params.phone;
  let page = req.query.page;
  let size = req.query.size;
  let type = req.query.type;
  userController.getAllClientSouscryptionByPhoneAndType(
    res,
    phone,
    page,
    size,
    type
  );
});

/**
 * All subscriptions of type subscript by a user by
 * phone number query param ?type=Automobile for example
 * get request.
 * Endpoint: user/assuranceClientResult/alltype/type?type=Type=Automobile
 */
router.get("/assuranceClientResult/alltype/type", (req, res) => {
  let type = req.query.type;
  let page = req.query.page;
  let size = req.query.size;
  userController.getAllSpecificClientType(res, type, page, size);
});

router.post("/sendEmail", (req, res) => {
  console.log("This is data send by client : ", req.body);
  let userInfo = "";
  if (req.body.type == "Automobile") {
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
      prospectname
    } = req.body;
    userInfo =  {
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
      prospectname
    } ;
  } else if (req.body.type == "multirisque") {
    const { type, produit, option, montant, email ,prospectname,assurances} = req.body;
    userInfo = { type, produit, option, montant, email ,prospectname,assurances};
  } else if (req.body.type == "condoleance") {
    const { type, produit, montant, email ,nbrPersonne,tableauPersonnes,taxe,totalHT,prospectname} = req.body;
    userInfo = { type, produit, montant, email ,nbrPersonne,tableauPersonnes,taxe,totalHT,prospectname};
  }


  userController.sendReceptionEmail(userInfo,res);
});

module.exports = router;
