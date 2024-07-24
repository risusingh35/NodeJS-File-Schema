const express = require('express');
const routes = require('./routes');
const { errorHandler } = require('./middleware');

const startApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api', routes);

  app.get('/', (req, res) => {
    res.send('<h1>Hello Home Route</h1>');
  });
  
  app.use(errorHandler);

  return app;
};

module.exports = startApp;
