const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/todo/', require('./router/todos'));

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome Home 🏠🤠' });
});

const PORT = process.env.PORT || 1212;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
