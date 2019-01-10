const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('App', () => {
    //this.timeout(15000);

    describe('/route2', () => {
        const param = "blablabla";
        it('the response contains the introduced param', function (done) {
            chai.request(server)
                .get(`/route2?param1=${param}`)
                .end(function (err, res) {
                    console.log(res.body);
                    expect(res.body.message).to.contain(param);
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});