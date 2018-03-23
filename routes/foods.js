var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, _next) {
  res.status(500).json({ error: 'foods index NYI' });
});

router.get('/:id', function(req, res, _next) {
  res.status(500).json({ error: 'foods show NYI' });
});

router.post('/', function(req, res, _next) {
  res.status(500).json({ error: 'foods create NYI' });
});

router.patch('/:id', function(req, res, _next) {
  res.status(500).json({ error: 'foods update NYI' });
});

router.delete('/:id', function(req, res, _next) {
  res.status(500).json({ error: 'foods destroy NYI' });
});

module.exports = router;
