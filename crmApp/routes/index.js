var express = require('express');
var router = express.Router();



/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/', function(req, res) {
  res.send({
  	users: ['aziz',"ZOUAOUI"]
});
  });
 */
  router.get('/', function(req, res) {
  res.render('index', { 
  	title: 'crmApp',
  	team: 'the CRM team',
  	welcome: 'welcome to' 
  });
});
module.exports = router;
