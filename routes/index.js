var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session;
  console.log('test'+sess.name);
  res.render('index', { title: 'Express' });
});

module.exports = router;
