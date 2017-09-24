var express = require('express');
var router = express.Router();
var app = express();

/* GET users listing. */
router.get('/test', function(req, res) {
	console.log("Test backend2");
	res.send('<p>some html</p>');
	res.status(200);
	console.log("sortie backend2");
});

module.exports = router;
