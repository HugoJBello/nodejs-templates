module.exports = (server) => {
    server.get('/route2', (req, res, next) => {
      const param1 = req.params.param1;
      res.send({message:'Hello from route 2. you introduced ' + param1});
      return next();
    });
};