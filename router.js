const bodyParser = require('body-parser')
// routes
const Test = require('./routes/test_routes')
const Billing = require('./routes/billing_routes')

// bodyParser attempts to parse any request into JSON format
const json_encoding = bodyParser.json({type:'*/*'})
const originCheck = require('./auth/originCheck').originCheck
const JWT_Check = require('./auth/JWT_Check').JWT_Check
// bodyParser attempts to parse any request into GraphQL format
// const graphql_encoding = bodyParser.text({ type: 'application/graphql' })

module.exports = function(app){

	// routes
	app.get('/test', [json_encoding], Test.test)

	// insertions
	app.post('/save_billing', [json_encoding], Billing.save_billing)
	app.post('/get_sales', [json_encoding], Billing.get_sales)
	app.post('/update_sale', [json_encoding], Billing.update_sale)
}
