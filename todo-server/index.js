const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const connectDb = require('./middleware/connectDb');

// app initialization
const app = express();

// middlewares
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

// db connection
connectDb();

// routes 🧾.
app.use('/api/todo/', require('./router/todos'));
app.use('/api/user/', require('./router/user'));
app.use('/api/auth/', require('./router/auth'));

// Home and NotFound routes
app.use('/', require('./middleware/home'));

const PORT = process.env.PORT || 1212;

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}/`)
);
