const AWS = require('aws-sdk')
const aws_config = require('../../../credentials/aws_config')
const BILLING_RECORDS = require('../dynamodb_tablenames').BILLING_RECORDS
// AWS.config.update(aws_config)


const billingRecordsTableParams = {
    TableName : BILLING_RECORDS,
    KeySchema: [
        // USE CASE: ALLOWS ME TO SEE ALL USER PREFERENCES INTEL IN CHRONOLOGICAL ORDER. EG: USER LOOKS FOR ENSUITE FIRST BEFORE CHANGING THEIR FILTERS TO LOOK FOR LESS ROOMATES NO ENSUITE
        { AttributeName: "DATE", KeyType: "HASH" },  //Partition key
        { AttributeName: "BILLING_ID", KeyType: "RANGE" },  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "DATE", AttributeType: "N" },
        { AttributeName: "BILLING_ID", AttributeType: "S" },
        { AttributeName: "CORPORATION_ID", AttributeType: "S" },
        { AttributeName: "SALE_ID", AttributeType: "S" },
        { AttributeName: "TENANT_ID", AttributeType: "S" },
        { AttributeName: "INQUIRY_ID", AttributeType: "S" },
        { AttributeName: "TOPIC", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2,
    },
    GlobalSecondaryIndexes: [
      {
        // USE CASE: ALLOWS ME TO SEE ALL INTEL OF A SPECIFIC ACTION, GROUPED BY USERS. EG: SHOW ME ALL PRICE ADJUSTMENTS, AND NOW I CAN GROUP USER POPULATIONS INTO PRICE RANGES.
        IndexName: 'By_Corporation_ID', /* required */
        KeySchema: [ /* required */
          {AttributeName: 'CORPORATION_ID', KeyType: 'HASH'},
          {AttributeName: 'DATE', KeyType: 'RANGE'}
        ],
        Projection: { /* required */
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: { /* required */
          ReadCapacityUnits: 2, /* required */
          WriteCapacityUnits: 2 /* required */
        }
      },
      {
        // USE CASE: ALLOWS ME TO SEE ALL INTEL OF A SPECIFIC ACTION, GROUPED BY USERS. EG: SHOW ME ALL PRICE ADJUSTMENTS, AND NOW I CAN GROUP USER POPULATIONS INTO PRICE RANGES.
        IndexName: 'By_Sale_ID', /* required */
        KeySchema: [ /* required */
          {AttributeName: 'SALE_ID', KeyType: 'HASH'},
          {AttributeName: 'DATE', KeyType: 'RANGE'}
        ],
        Projection: { /* required */
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: { /* required */
          ReadCapacityUnits: 2, /* required */
          WriteCapacityUnits: 2 /* required */
        }
      },
      {
        // USE CASE: ALLOWS ME TO SEE ALL INTEL OF A SPECIFIC ACTION, GROUPED BY USERS. EG: SHOW ME ALL PRICE ADJUSTMENTS, AND NOW I CAN GROUP USER POPULATIONS INTO PRICE RANGES.
        IndexName: 'By_Topic', /* required */
        KeySchema: [ /* required */
          {AttributeName: 'TOPIC', KeyType: 'HASH'},
          {AttributeName: 'DATE', KeyType: 'RANGE'}
        ],
        Projection: { /* required */
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: { /* required */
          ReadCapacityUnits: 2, /* required */
          WriteCapacityUnits: 2 /* required */
        }
      },
      {
        // USE CASE: ALLOWS ME TO SEE ALL INTEL OF A SPECIFIC ACTION, GROUPED BY USERS. EG: SHOW ME ALL PRICE ADJUSTMENTS, AND NOW I CAN GROUP USER POPULATIONS INTO PRICE RANGES.
        IndexName: 'By_Tenant_ID', /* required */
        KeySchema: [ /* required */
          {AttributeName: 'TENANT_ID', KeyType: 'HASH'},
          {AttributeName: 'DATE', KeyType: 'RANGE'}
        ],
        Projection: { /* required */
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: { /* required */
          ReadCapacityUnits: 2, /* required */
          WriteCapacityUnits: 2 /* required */
        }
      },
      {
        // USE CASE: ALLOWS ME TO SEE ALL INTEL OF A SPECIFIC ACTION, GROUPED BY USERS. EG: SHOW ME ALL PRICE ADJUSTMENTS, AND NOW I CAN GROUP USER POPULATIONS INTO PRICE RANGES.
        IndexName: 'By_Inquiry_ID', /* required */
        KeySchema: [ /* required */
          {AttributeName: 'INQUIRY_ID', KeyType: 'HASH'},
          {AttributeName: 'DATE', KeyType: 'RANGE'}
        ],
        Projection: { /* required */
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: { /* required */
          ReadCapacityUnits: 2, /* required */
          WriteCapacityUnits: 2 /* required */
        }
      }
    ]
}

exports.createTables = function(){

  console.log("==> About to create DynamoDB tables!")

  const dynamodb = new AWS.DynamoDB({
    dynamodb: '2012-08-10',
    region: "us-east-1"
  })

  dynamodb.createTable(billingRecordsTableParams, function(err, data) {
      if (err)
          console.log(JSON.stringify(err, null, 2));
      else
          console.log(JSON.stringify(data, null, 2));
  })
}
