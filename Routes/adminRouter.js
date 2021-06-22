
/** This is for the Admin routes. {@link link
 name}
 * @author Author/Ndeme Yvan
 * @date Nov 20/2020
 * Contributors : contributor name,
**/

const express = require("express");
const router = express.Router();
const basic_auth = require("../middlewares/basic_auth.js");
const adminController = require("../Controllers/Admin");
router.use(basic_auth);


/**
 * Recover all insurance registered by the client
 * get request.
 * Endpoint: user/assuranceClientResult
 **/
router.get("/assuranceClientResult", (req, res) => {
  let page = req.query.page;
  let size = req.query.size;
  adminController.getAssuranceClientResult(res, page, size);
});

/**
 * Recover all insurance registered by the client with his phone number
 * get request.
 * Endpoint: user/assuranceClientResult/phone
 **/
router.get("/assuranceClientResult/phone", (req, res) => {
  let phone = req.query.phone;
  adminController.getAllSpecificClientSubcribe(res, phone);
});

/**
/*** A function To obtain all the insurances according to a type
 * get request.
 * Endpoint: user/assuranceClientResult/phone
 **/
router.get("/assuranceClientResult/type", (req, res) => {
  let type = req.query.type;
  let page = req.query.page;
  let size = req.query.size;
  adminController.getAllSpecificClientType(res, type, page, size);
});


/**
 * To update  the customers subscribed to the insurance according to the assurance id
 * patch request.
 * Endpoint: user/assuranceClientResult/phone
 **/
router.patch("/assuranceClientResult/:id", (req, res) => {
  let data = {};
  data.name = req.body.name;
  data.telephone = req.body.telephone;
  data.application = req.body.application;
  data.montant = req.body.montant;
  data.status = req.body.status;
  data.type = req.body.type;
  data.response = req.body.response;
  let id = req.params.id;
  adminController.editAssuranceClientResult(res, data, id);
});
/*
  Update the status of a payment
   patch request.
  Endpoint: user/assuranceClientResult/payment/idOfTheDoc
*/
router.patch("/assuranceClientResult/payment/:id", (req, res) => {
  let data = {};
  data.status = req.body.status;
  data.statusPayment = req.body.statusPayment;
  let id = req.params.id;
  if (data.statusPayment == undefined || data.status == undefined) {
    res.statusCode = 400
    res.json({ message: "Status or StatusPayment is empty" })
  } else {
    adminController.editPaymentStatusAssuranceClientResult(res, data, id);
  }
});

//this road will be removed
router.patch("/assuranceClientResult/removenestedfield/:id", (req, res) => {
  adminController.removeNestedField(res, req.params.id);
});

/**
  Update the download status of the pink card and the certificate 
  This route queries the field to be updated 
    Endpoint: admin/assuranceClientResult/statusCarteRoseAttestation/idOfTheDoc

 **/
router.patch("/assuranceClientResult/statusCarteRoseAttestation/:id", (req, res) => {

  var type = req.query.type;
  let data = {};
  data.status = req.body.status;
  let id = req.params.id;
  if (type == undefined) {
    res.statusCode = 400
    res.json({ message: "le type de champ a mettre a jour n'est pas specifie en query parameter type : AT --> attestation ,CR --> carte rose " })
  } else {
    adminController.editCarteRoseAndAttestation(res, type, data, id);
  }
});

/**
 * To delete  the customers subscribed to the insurance according to the assurance id
 * get request.
 * Endpoint: admin/assuranceClientResult/phone
 **/
router.delete("/assuranceClientResult/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  adminController.removeClientAssuranceResult(res, id);
});

module.exports = router;