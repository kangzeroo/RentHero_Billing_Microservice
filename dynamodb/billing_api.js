
const AWS = require('aws-sdk')
const aws_config = require('../credentials/aws_config')
const dynaDoc = require("dynamodb-doc");
AWS.config.update(aws_config)
const Rx = require('rxjs')
const BILLING_RECORDS = require('./schema/dynamodb_tablenames').BILLING_RECORDS

const dynamodb = new AWS.DynamoDB({
  dynamodb: '2012-08-10',
  region: "us-east-1"
})
const docClient = new dynaDoc.DynamoDB(dynamodb)

const queryBillingForTarget = require('./dynamodb_query').queryBillingForTarget
const scanBillingForTarget = require('./dynamodb_query').scanBillingForTarget

exports.saveBillingForTarget = function(bill){
  const p = new Promise((res, rej) => {
    bill.VALID = true
    const item = {
      'TableName': BILLING_RECORDS,
      'Item': bill
    }
    docClient.putItem(item, function(err, data) {
      if (err){
          console.log(JSON.stringify(err, null, 2));
          rej()
      }else{
          console.log('INTEL INSERTION SUCCESS!')
          res({
            message: 'success'
          })
      }
    })
  })
  return p
}


exports.getAllMatchingSales = function(info){
  const p = new Promise((res, rej) => {
    const minDate = info.minDate || 0
    const maxDate = info.maxDate || 9999999999999999999999999999999
    const building_id = info.building_id
    const corporation_id = info.corporation_id
    const tenant_id = info.tenant_id

    let params = {
      "TableName": BILLING_RECORDS,
      "FilterExpression": `#DATE_OF_SALE BETWEEN :minDate AND :maxDate${ building_id ? ' AND #BUILDING_ID = :building_id' : ''}${ corporation_id ? ' AND #CORPORATION_ID = :corp_id' : ''}${ tenant_id ? ' AND #TENANT_ID = :tenant_id' : ''}`,
      "ExpressionAttributeNames": {
        "#DATE_OF_SALE": "DATE_OF_SALE"
      },
      "ExpressionAttributeValues": {
        ":minDate": minDate,
        ":maxDate": maxDate
      }
    }
    if (building_id) {
      params.ExpressionAttributeNames["#BUILDING_ID"] = "BUILDING_ID"
      params.ExpressionAttributeValues[":building_id"] = building_id
    }
    if (corporation_id) {
      params.ExpressionAttributeNames["#CORPORATION_ID"] = "CORPORATION_ID"
      params.ExpressionAttributeValues[":corp_id"] = corporation_id
    }
    if (tenant_id) {
      params.ExpressionAttributeNames["#TENANT_ID"] = "TENANT_ID"
      params.ExpressionAttributeValues[":tenant_id"] = tenant_id
    }
    console.log('made params')
    console.log(params)
    scanBillingForTarget(params).then((data) => {
      console.log('got billing')
      console.log(data)
      res(data)
    }).catch((err) => {
      console.log(err)
      rej(err)
    })
  })
  return p
}


exports.getSalesWithTheseInquiryIDs = function(ids){

}

exports.updateSale = function(sale){
  const p = new Promise((res, rej) => {
    const updatedNote = {
      'TableName': BILLING_RECORDS,
      'Item': sale,
    }
    docClient.putItem(updatedNote, function(err, data) {
      if (err){
          console.log(JSON.stringify(err, null, 2));
          rej()
      }else{
          console.log('HINT UPDATED!')
          res('success')
      }
    })
  })
  return p
}
