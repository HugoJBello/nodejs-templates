const restify = require('restify');
const routes = require("./routes");

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoUrl = "mongodb://localhost:27017/test";
mongoose.connect(mongoUrl, { promiseLibrary: require('bluebird') })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

const server = restify.createServer({ name: 'api' });
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
        mapParams: true
    }));
server.use(restify.plugins.acceptParser(server.acceptable));

routes(server);

server.listen(3000);

// export for testing
module.exports = server;