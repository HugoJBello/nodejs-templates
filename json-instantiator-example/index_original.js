//https://www.npmjs.com/package/json-schema-default-instance
const {Instantiator} = require('json-schema-default-instance');
const mySchemas = [
  {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "theSchemaId",
    "type": "object",
    "required": [
      "firstName",
      "lastName"
    ],
    "properties": {
      "firstName": {
        "type": "string",
        "default": "Foo"
      },
      "lastName": {
        "type": "string",
        "default": "Bar"
      },
      "optionalProperty": {
        "type": "string",
        "default": "Hello"
      }
    }
  }
]
 
/* Instantiate with all properties */
let ins = new Instantiator(mySchemas);
let myDefaultInstance = ins.instantiate('theSchemaId');
console.log(myDefaultInstance);
 
// => { firstName: 'Foo', lastName: 'Bar', optionalProperty: 'Hello' }
 
/* This time, only with `required` properties */
ins.requiredOnly = true;
let myRequiredInstance = ins.instantiate('theSchemaId');
console.log(myRequiredInstance);
 
// => { firstName: 'Foo', lastName: 'Bar' }