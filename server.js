const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errors');
// Route files
const bootcamps = require('./routes/bootcamps');
// const logger = require('./middleware/logger');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env variables
dotenv.config({
  path: './config/config.env'
});
const app = express();
connectDB();
// body parser

app.use(express.json());
// app.use(logger);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} made on port ${PORT}`)
);

// handle unhandled promises rejection
process.on('unhandledRejection', (err, promises) => {
  console.log(`Error: ${err}`);
  // close the server and exit the process
  server.close(() => process.exit(1));
});
