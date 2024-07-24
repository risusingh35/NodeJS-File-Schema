// index.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('./config');
const startApp = require('./src/app');

dotenv.config();

const startServer = async () => {
  try {
    await mongoose.connect(config.database.url, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Database connected');
    
    const app = startApp();
    app.listen(config.server.port, () => {
      console.log(`Server running on port ${config.server.port}`);
    });
  } catch (error) {
    console.error('Error connecting to database', error);
  }
};

startServer();
