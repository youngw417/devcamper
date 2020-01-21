const moongoose = require('mongoose');

const connectDb = async () => {
  const conn = await moongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDb;
