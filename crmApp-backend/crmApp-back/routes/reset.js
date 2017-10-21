var express = require('express');
var router = express.Router();
var app = express();
var nodemailer = require('nodemailer');

console.log("entree node mailer: RESET");
/* GET Email reset logic && send email. */


router.post('/reset', function(req, res) {

	var email = req.body.email;
	console.log("username: ", email);
	//requete verifiant si le courriel existe
	// validation si existe, donc on execute la requete pour 
	// chercher le mot de passe associé dans la bd
	
	//simulation d'un resultat de requete BD pour retrouver email
	var mdpBD = "MdpVenantDeLaBD2017";
	console.log("password recu de la BD: ", mdpBD);
	
	var transporter = nodemailer.createTransport({
		  service: 'gmail',
		  auth: {
		    user: 'crm.udes@gmail.com',
		    pass: 'crmudes2017'
		  }
		});

		var mailOptions = {
		  from: 'crm.udes@gmail.com',
		  to: 'aziz.zouaoui@brp.com',
		  subject: 'Récuperation de mot de passe oublié',
		  text: 'Voici votre mot de passe oublié: ' + mdpBD + '/n Merci de votre confiance /n TEAM CRM',
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		    res.send({ 
				emailSent : 'true',
			});
		    
		  }
		});
	
			
	console.log("sortie backend");
});

module.exports = router;
