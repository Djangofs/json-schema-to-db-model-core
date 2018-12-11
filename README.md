# json-schema-to-db-model-core

Core functions to create Sequelize database models (http://docs.sequelizejs.com/manual/tutorial/models-definition.html) from json schema (https://json-schema.org/). 

NPM package: https://www.npmjs.com/package/json-schema-to-db-model-core

## Usage:

`npm install --save json-schema-to-db-model-core`

```
const { createModelFiles } = require("json-schema-to-db-model-core");
const schema = require("./schema);

createModelFiles(schema, "models");
```

## Requirements: 
Node v8.9+

## Testing:
To run the unit tests you'll need to clone the git repo, then run `npm ci`, `npm test` 

## Improvements - The following are on the to do list:
* Validate input schema before attempting to create models
* Add default validation functions from json schema to the model definitions
* Support Array data type
* Support NoSQL database
* Support an ORM other than Sequelize, or create raw SQL output

## Limitations - The following are not planned to be worked on due to limitations in the fundamental nature of json schema or a database model:
* Only supports single data types in schema. This means you cannot define a field as having potential multiple types, which json schema allows. This could be revisited for a NoSQL database.
* Only supports "belongsTo" relationship. This is the most obvious relationship to implemenent from json schema definition. Further relationship types would require additions to the information held in json schema, so will not be looking to add this for now.
