const { Given, When, Then } = require('cucumber');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const {setWorldConstructor} = require('cucumber');

function CustomWorld (){
    this.url = "localhost:3000";
};
setWorldConstructor(CustomWorld);

Given('Server is up', function () {
    // Write code here that turns the phrase above into concrete actions
    //return 'pending';
});

When('we use the api to save a new entry:', function (entries) {
    console.log(entries.hashes());
    console.log(this.url);
    // Write code here that turns the phrase above into concrete actions
    //return 'pending';
});

Then('we can retrieve it using the api', function () {
    // Write code here that turns the phrase above into concrete actions
    //return 'pending';
});
