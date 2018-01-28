const BILLING_RECORDS = require('../dynamodb_tablenames').BILLING_RECORDS

// ====================================

exports.reference_items = [
  {
    // When a user hovers over <BuildingCard> in <HousingPanel> of <HousingPage> in Tenant_Website
    'TableName': BILLING_RECORDS,
    'Item': {
      'BILLING_ID': `uuid.v4()`,                    // BILLING_ID is the unique identifier for this table
      'TOPIC': 'WON' || 'LOST' || 'EMPTY',
      'CORPORATION_ID': `landlord.corporation_id`,
      'TENANT_ID': `tenant.tenant_id` || 'NONE',
      'INQUIRY_ID': `inquiry.inquiry_id` || 'NONE',
      'DATE': new Date().getTime(),
      'SALE_ID': 'uuid.v4()',                       // SALE_ID is the original ID created by a 'WON LOST EMPTY'. All associated expenses (ie. GIFT & TOUR_LABOR & TOUR_COMMISSION) can be matched to this SALE_ID

      'EMPLOYEE_ID': `employee_mapping.employee_id`,
      'EMPLOYEE_NAME': `employee_mapping.employee_name`,
      'AUTHOR_ID': 'staff.staff_id',
      'DATE_OF_SALE': new Date().getTime(),         // for when the billing period was valid for
      'LEASE_BEGIN_DATE': new Date().getTime(),         // for when the lease begins
      'GROUP_SIZE': 1,
      'BUILDING_ID': 'building.building_id' || 'NONE',
      'BUILDING_ADDRESS': 'building.building_address' || 'google address autocomplete (not one of ours)',
      'SUITE_NAME': 'suite.suite_alias' || 'NONE',
      'SUITE_ID': 'suite.suite_id' || 'NONE',
      'REVENUE_PER_ROOM': 100 || 150 || 200,        // includes cavalry commission
      'INVOICED_AMOUNT': 500,
      'INVOICED_DATE': new Date().getTime(),
      'COLLECTED_AMOUNT': 500,
      'COLLECTED_DATE': new Date().getTime(),
      'UNIT_LEASED': 'Unit 202',
      'ROOMMATE_NAMES': 'Joe, Bob, Ryan',
      'NOTES': 'Additional notes entered here',
      'VALID': true || false,
    }
  },
  {
    // When a user hovers over <BuildingCard> in <HousingPanel> of <HousingPage> in Tenant_Website
    'TableName': BILLING_RECORDS,
    'Item': {
      'BILLING_ID': `uuid.v4()`,
      'TOPIC': 'GIFT' || 'GOODWILL',
      'CORPORATION_ID': `landlord.corporation_id`,
      'TENANT_ID': `tenant.tenant_id` || 'NONE',
      'INQUIRY_ID': `inquiry.inquiry_id` || 'NONE',
      'DATE': new Date().getTime(),
      'SALE_ID': 'WON/LOST/EMPTY.sale_id',

      'EMPLOYEE_ID': `employee_mapping.employee_id`,
      'AUTHOR_ID': 'staff.staff_id',
      'ROOMMATE_NAME': 'Bill',
      'COST': 5,
      'ITEM_NAME': 'PILLOW' || 'FOOD',
      'DELIVERY_LOCATION': 'google address autocomplete',
      'DELIVERY_DATE': new Date().getTime(),
      'NOTES': 'Additional notes entered here'
    }
  },
  {
    // When a user hovers over <BuildingCard> in <HousingPanel> of <HousingPage> in Tenant_Website
    'TableName': BILLING_RECORDS,
    'Item': {
      'BILLING_ID': `uuid.v4()`,
      'TOPIC': 'TOUR_LABOR',
      'CORPORATION_ID': `landlord.corporation_id`,
      'TENANT_ID': `tenant.tenant_id` || 'NONE',
      'INQUIRY_ID': `inquiry.inquiry_id`,
      'DATE': new Date().getTime(),
      'SALE_ID': 'WON/LOST/EMPTY.sale_id' || 'NONE',

      'EMPLOYEE_ID': `employee_mapping.employee_id`,
      'EMPLOYEE_NAME': 'Johnny',
      'AUTHOR_ID': 'staff.staff_id',
      'TOUR_ID': 'tour.tour_id',
      'LABOR_MINUTES': 20,
      'COST_PER_HOUR': 25,
      'DATE_PAID': new Date().getTime(),
      'NOTES': 'Additional notes entered here'
    }
  },
  {
    // When a user hovers over <BuildingCard> in <HousingPanel> of <HousingPage> in Tenant_Website
    'TableName': BILLING_RECORDS,
    'Item': {
      'BILLING_ID': `uuid.v4()`,
      'TOPIC': 'TOUR_COMMISSION',
      'CORPORATION_ID': `landlord.corporation_id`,
      'TENANT_ID': `tenant.tenant_id` || 'NONE',
      'INQUIRY_ID': `inquiry.inquiry_id` || 'NONE',
      'DATE': new Date().getTime(),
      'SALE_ID': 'WON/LOST/EMPTY.sale_id',

      'EMPLOYEE_ID': `employee_mapping.employee_id`,
      'EMPLOYEE_NAME': 'Johnny',
      'AUTHOR_ID': 'staff.staff_id',
      'TOUR_ID': 'tour.tour_id',
      'DATE_PAID': new Date().getTime(),
      'COMMISSION_PER_ROOM': 15,
      'NUM_OF_ROOMS': 1,
      'NOTES': 'Additional notes entered here'
    }
  },
  {
    // When a user hovers over <BuildingCard> in <HousingPanel> of <HousingPage> in Tenant_Website
    'TableName': BILLING_RECORDS,
    'Item': {
      'BILLING_ID': `uuid.v4()`,
      'TOPIC': 'XXXX',
      'CORPORATION_ID': `landlord.corporation_id`,
      'TENANT_ID': `tenant.tenant_id` || 'NONE',
      'INQUIRY_ID': `inquiry.inquiry_id` || 'NONE',
      'DATE': new Date().getTime(),
      'SALE_ID': 'WON/LOST/EMPTY.sale_id',

      'EMPLOYEE_ID': `employee_mapping.employee_id`,
      'EMPLOYEE_NAME': `employee_mapping.employee_name`,
      'AUTHOR_ID': 'staff.staff_id',
      'XXX': 'YYY',
      'XXX': 'YYY',
      'XXX': 'YYY',
      'XXX': 'YYY',
      'XXX': 'YYY',
      'XXX': 'YYY',
    }
  }
]
