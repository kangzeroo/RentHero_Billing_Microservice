const saveBillingForTarget = require('../dynamodb/billing_api').saveBillingForTarget
const getAllMatchingSales = require('../dynamodb/billing_api').getAllMatchingSales
const updateSale = require('../dynamodb/billing_api').updateSale

// POST /save_billing
exports.save_billing = function(req, res, next){
  const bill = req.body
  saveBillingForTarget(bill).then((data) => {
    res.json(data)
  }).catch((err) => {
    console.log(err)
    res.status(500).send(err)
  })
}

// POST /get_sales
exports.get_sales = function(req, res, next){
  getAllMatchingSales(req.body).then((data) => {
    res.json(data)
  }).catch((err) => {
    console.log(err)
    res.status(500).send(err)
  })
}

// POST /update_sale
exports.update_sale = function(req, res, next){
  updateSale(req.body).then((data) => {
    res.json(data)
  }).catch((err) => {
    console.log(err)
    res.status(500).send(err)
  })
}
