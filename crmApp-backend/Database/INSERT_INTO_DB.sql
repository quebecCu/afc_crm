--## SCRIPT D'INSERTION TEST 					    ###
--## PLATEFORME: PostgreSQL							###
--## AUTEURS: Equipe CRM - UdeS A17                 ###
--## DECEMBRE 2017                                  ###
--## COPYRIGHT (c)                                  ###
--#####################################################

-----users schema-----
SELECT setval('users."ROLEADM_idrole_seq"', 1, FALSE);
SELECT setval('users."UTILISATEUR_iduser_seq"', 1, FALSE);
SELECT setval('users."MENU_idmenu_seq"', 1, FALSE);
SELECT setval('users."OPERATION_idoperation_seq"', 1, FALSE);
SELECT setval('users."TAB_idtab_seq"', 1, FALSE);
SELECT setval('users."TYPECHAMP_idtype_seq"', 1, FALSE);
SELECT setval('users."CHAMP_idchamp_seq"', 1, FALSE);

---ROLEADM---
INSERT INTO users."ROLEADM"(description) VALUES ('Administrateur');
INSERT INTO users."ROLEADM"(description) VALUES ('Utilisateur');
INSERT INTO users."ROLEADM"(description) VALUES ('Visiteur');

---OPERATION---
INSERT INTO users."OPERATION"(description) VALUES ('CREATE');
INSERT INTO users."OPERATION"(description) VALUES ('READ');
INSERT INTO users."OPERATION"(description) VALUES ('UPDATE');
INSERT INTO users."OPERATION"(description) VALUES ('DELETE');

---MENU---
INSERT INTO users."MENU"(description) VALUES ('Accueil');
INSERT INTO users."MENU"(description) VALUES ('Gestion des accès');
INSERT INTO users."MENU"(description) VALUES ('Gestion des utilisateurs');
INSERT INTO users."MENU"(description) VALUES ('Gestion des clients');
INSERT INTO users."MENU"(description) VALUES ('Gestion des prospects');
INSERT INTO users."MENU"(description) VALUES ('Gestion des fournisseurs');
INSERT INTO users."MENU"(description) VALUES ('Gestion des contrats - ACollectives');
INSERT INTO users."MENU"(description) VALUES ('Gestion des contrats - AIndiv');

---PERMISSIONR---
--Administateur--
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 1, 1);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 1, 2);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 1, 3);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 1, 4);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 2, 1);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 2, 2);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 2, 3);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 2, 4);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 3, 1);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 3, 2);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 3, 3);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 3, 4);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 4, 1);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 4, 2);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 4, 3);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 4, 4);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 5, 1);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 5, 2);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 5, 3);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 5, 4);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 6, 1);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 6, 2);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 6, 3);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 6, 4);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 7, 1);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 7, 2);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 7, 3);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 7, 4);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 8, 1);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 8, 2);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 8, 3);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (1, 8, 4);

--User--
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (2, 1, 1);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (2, 1, 4);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (2, 1, 5);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (2, 1, 6);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (2, 1, 7);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (2, 1, 8);

--INVITE--
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (3, 1, 1);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (3, 1, 4);
INSERT INTO users."PERMISSIONROLE"(idrole, idmenu, idoperation) VALUES (3, 1, 7);


--BEGINDATATEST
INSERT INTO users."UTILISATEUR"(login, password, mail, idrole) VALUES ('alain_prouvist', 'crm2017', 'ceciestuntest@test.com', 1);
INSERT INTO users."UTILISATEUR"(login, password, mail, idrole) VALUES ('maxime_isation', 'crm2017', 'ceciestuntest@test.com', 2);
INSERT INTO users."UTILISATEUR"(login, password, mail, idrole) VALUES ('jean_neymar', 'crm2017', 'ceciestuntest@test.com', 3);
--ENDDATATEST
-----end user schema -----


-----public schema-----
INSERT INTO public."CHAMBRE_COMMERCE"(description) VALUES ('Chambre de Sherbrooke');
-----end public schema -----


