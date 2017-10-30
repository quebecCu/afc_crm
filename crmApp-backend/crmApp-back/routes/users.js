var express = require('express');
var router = express.Router();
var app = express();

/* GET users listing. */
router.get('/test', function(req, res) {
	console.log("Test backend2");

	res.send('Une div que lon peut inserer dynamiquement ');
	res.status(200);

	console.log("end get /test");
});

module.exports = router;
 