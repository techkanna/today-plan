const router = require('express').Router();

// Home route 🏠.
router.get('/', (_, res) => {
  res.json({ msg: 'Welcome Home 🏠🤠' });
});

// not found route [404]
router.get('*', function (req, res) {
  res
    .status(404)
    .json({ msg: `Sorry can't find that!, ${req.originalUrl}...😢` });
});
module.exports = router;
