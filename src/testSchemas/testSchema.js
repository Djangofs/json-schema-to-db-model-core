const testSchema = {
  registration: {
    type: "object",
    properties: {
      establishment_details: {
        type: "object",
        properties: {
          establishment_email: {
            type: "string"
          },
          establishment_opening_date: {
            type: "string"
          }
        },
        required: [
          "establishment_trading_name",
          "establishment_primary_number",
          "establishment_email",
          "establishment_opening_date"
        ]
      },
      operator: {
        type: "object",
        properties: {
          operator_first_line: {
            type: "string"
          },
          operator_secondary_number: {
            type: "string"
          },
          operator_email: {
            type: "string"
          },
          operator_child: {
            type: "object",
            properties: {
              child_property: {
                type: "string"
              },
              operator_child_child: {
                type: "object",
                properties: {
                  child_property: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      },
      premise: {
        type: "object",
        properties: {
          establishment_postcode: {
            type: "string"
          },
          establishment_first_line: {
            type: "string"
          }
        },
        required: ["establishment_postcode"]
      },
      activities: {
        type: "object",
        properties: {
          business_other_details: {
            type: "string"
          }
        }
      },
      referenceNumber: {
        type: "string"
      }
    }
  }
};

module.exports = testSchema;
