/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { errorsFisher } = require('./middlewares/errorsFisher');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
  autoIndex: true,
}).then(() => {
  console.log('db is connected');
});

app.use(cors({
  origin: 'http://192.168.0.7:3000',
}));

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsFisher);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
