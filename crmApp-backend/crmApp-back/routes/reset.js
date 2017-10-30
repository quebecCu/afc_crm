var express = require('express');
var router = express.Router();
var app = express();
var nodemailer = require('nodemailer');
var db = require('../models');
var crypto = require('crypto');
/* GET Email reset logic && send email. */
router.post('/reset', function(req, res) {

	var emailReceived = req.body.email;
	var _send = false;
	var _token = Math.random().toString(36).slice(2);
	var chrono = Date.now() + 3600000;
 	var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false, 
        auth: {
            user: 'crm.udes@gmail.com', 
            pass: 'CrmUdes2017'  
        },
        tls: {
            rejectUnauthorized: false
        }
    }); 
    var mailOptions = {
            from: 'crm.udes@gmail.com',
            to: emailReceived,
            subject: 'Récuperation de mot de passe oublié',
            text: 'Voici votre mot de passe oublié:\n\n  http://localhost:3000/Reset/' + _token + '\n\nÉquipe CRM',
          };
	
	 db.User.findOne({
	        attributes: ['iduser','login', 'password', 'idrole', 'mail', 'name', 'resetpasswordtoken','resetpasswordexpires'],
	 where: {
		 mail: emailReceived
		  }
	 }).then(function (user) {
		 var test = user.dataValues.resetpasswordtoken;
		 console.log("testtttttt  " + test );
		 if(!user) {
			 res.send({ 
				 status : 'fail',
				 message : 'Le courriel est incorrect'
			 });
		 }
		 else
		 {		
			  transporter.sendMail(mailOptions, function(error, info){
		            if (error) {
		              console.log(error);
		            } else {
		              console.log('Email sent: ' + info.response);
		                  }
		        });

			  _updateFunction(_token, chrono);
			 res.send({ 
				 
				 resetPasswordToken : _token,
				 resetPasswordExpires : Date.now() + 3600000,
				 status : 'success'
			 });
		 }
		 
	
	 });
	
	 function _updateFunction (_token, chrono) {
		 console.log("_________resetpasswordtoken   " + _token);
		    
		 db.sequelize.query('UPDATE users."UTILISATEUR" SET resetpasswordtoken=\''+ _token + ' \''  + ' where mail = \'' +  emailReceived + '\'')

		 db.sequelize.query('UPDATE users."UTILISATEUR" SET resetpasswordexpires=\''+ chrono + ' \''  + ' where mail = \'' +  emailReceived + '\'')

}
});

module.exports = router;
