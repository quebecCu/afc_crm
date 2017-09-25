var express = require('express');
var router = express.Router();
var app = express();

/* GET users listing. */
router.get('/login', function(req, res) {
	console.log("Test backend login");
	res.send('<p class="brand" href="index.html">Goat.js</p>');
	res.status(200);
	console.log("sortie backend login");
});

module.exports = router;
