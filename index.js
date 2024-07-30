// index.js
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const {database,server} = require('./config/index');
const startApp = require('./src/app');
const startServer = async () => {
  try {
    await mongoose.connect(database.mongoDB.uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Database connected');
    
    const app = startApp();
    app.listen(server.PORT, () => {
      console.log(`Server running on port ${server.PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to database', error);
  }
};

startServer();
