const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Entry =  require('../models/Entry');
const expect = chai.expect;

chai.use(chaiHttp);

describe('App', () => {
    //this.timeout(15000);

    describe('/entry?id=test', () => {
        const param = "blablabla";
        it('should retrieve the entry', function (done) {
            chai.request(server)
                .get(`/entry?id=test`)
                .end(function (err, res) {
                    if (err) throw err;
                    expect(res).to.have.status(200);
                    expect(res.title).not.undefined;
                    done();
                });
        });
    });

    describe('/entry_save', () => {
        const entry = {_id:"test-entry", title:"test", }
        it('it should post the entry', function (done) {
            chai.request(server)
                .post(`/entry_save`)
                .send(entry)
                .end(function (err, res) {
                    Entry.findOne({ _id: entry._id }).exec(function (err, foundEntry) {
                        expect(foundEntry).not.null;
                      });
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});