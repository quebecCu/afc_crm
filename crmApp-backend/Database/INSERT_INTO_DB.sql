--## SCRIPT D'INSERTION TEST 					    ###
--## PLATEFORME: PostgreSQL							###
--## AUTEURS: Equipe CRM - UdeS A17                 ###
--## DECEMBRE 2017                                  ###
--## COPYRIGHT (c)                                  ###
--#####################################################

-----users schemas-----
INSERT INTO users."ROLEADM"(description) VALUES ('Administrateur');
INSERT INTO users."ROLEADM"(description) VALUES ('Utilisateur');
INSERT INTO users."ROLEADM"(description) VALUES ('Visiteur');

--BEGINDATATEST
INSERT INTO users."UTILISATEUR"(login, password, idrole) VALUES ('alain_prouvist', 'crm2017', 1);
INSERT INTO users."UTILISATEUR"(login, password, idrole) VALUES ('maxime_isation', 'crm2017', 2);
INSERT INTO users."UTILISATEUR"(login, password, idrole) VALUES ('jean_neymar', 'crm2017', 3);
--ENDDATATEST
