const restify = require('restify');
const routes = require("./routes");

const server = restify.createServer({ name: 'api' });
server.use(restify.plugins.queryParser());
routes(server);

server.listen(3000);

// export for testing
module.exports = server;