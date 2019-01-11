// combine routes
const entriesRoutes = require('./entries');

module.exports= (server) => {
  entriesRoutes(server);
};