//https://www.npmjs.com/package/json-schema-default-instance
const {Instantiator} = require('json-schema-default-instance');
const fs = require("fs");


const contents = fs.readFileSync("schema.json");
const schema = JSON.parse(contents);
console.log(schema)

const mySchemas = [schema];
 
/* Instantiate with all properties */
let ins = new Instantiator(mySchemas);
let myDefaultInstance = ins.instantiate('sender');
console.log(myDefaultInstance);
 
// => { firstName: 'Foo', lastName: 'Bar', optionalProperty: 'Hello' }
 
/* This time, only with `required` properties */
ins.requiredOnly = true;
let myRequiredInstance = ins.instantiate('sender');
console.log(myRequiredInstance);
 
// => { firstName: 'Foo', lastName: 'Bar' }