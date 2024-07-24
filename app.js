const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');
const { errorHandler } = require('./middleware');
const config = require('./config');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/', routes);

app.use('/', (req, res) => {
  res.send(`<h1>Hello Home Route</h1>`);
});
// Error handling middleware
app.use(errorHandler);

const startServer = async () => {
  try {
     mongoose.connect(config.database.url, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Database connected');
    app.listen(config.server.port, () => {
      console.log(`Server running on port ${config.server.port}`);
    });
  } catch (error) {
    console.error('Error connecting to database', error);
  }
};

startServer();
