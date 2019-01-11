const Entry = require('../models/Entry');

const routes= (server) => {
  server.get('/entry', (req, res, next) => {
      const id = req.query.id;

      Entry.findOne({ _id: id }).exec(function (err, entry) {
        if (err) throw err;
        res.send(entry);
        return next();
      });
    });

  server.post('/entry_save', (req, res, next) => {
    const body = req.params;
    res.send({message:'Hello from route 2 post. you introduced ' + body.param1});
    return next();
  });
};

module.exports = routes;
