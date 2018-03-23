var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, _next) {
  res.status(500).json({ error: 'meals index NYI' });
});

router.get('/:meal_id/foods', function(req, res, _next) {
  res.status(500).json({ error: 'meal foods index NYI' });
});

router.post('/:meal_id/foods/:id', function(req, res, _next) {
  res.status(500).json({ error: 'meal foods create NYI' });
});

router.delete('/:meal_id/foods/:id', function(req, res, _next) {
  res.status(500).json({ error: 'meals index NYI' });
});

module.exports = router;
