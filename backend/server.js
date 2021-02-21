const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./App');

dotenv.config({
  path: './backend/config.env'
});


const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('DB connection successful!'));

app.get('/', ((req, res) => {
  res.send('Welcome to backend');
}));

app.listen(5000, () => {
  console.log('listening on port 5000');
});
