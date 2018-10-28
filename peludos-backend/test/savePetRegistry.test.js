const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('App', function () {
    describe('/api/registry/save_pet', function () {
        it('responds with status 200', function (done) {
            const newRegistry = {
                _id: "test_registry",
                date: new Date(),
                coordinates: [1, 2],
                animal: {
                    _id: "test_animal_id",
                    animalType: "dog"
                }
            };

            chai.request(app)
                .post('/api/registry/save', newRegistry)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});