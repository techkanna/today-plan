const express = require('express');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
app.use(morgan('tiny'));
app.use(express.json());

// db connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('db connected'));

// todos route 🧾.
app.use('/api/todo/', require('./router/todos'));

// Home route 🏠.
app.get('/', (_, res) => {
  res.json({ msg: 'Welcome Home 🏠🤠' });
});

// not found route [404]
app.use('/:address', function (req, res) {
  res
    .status(404)
    .json({ msg: `Sorry can't find that!, ${req.params.address}...😢` });
});

const PORT = process.env.PORT || 1212;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
