--## SCRIPT D'INSERTION TEST 					    ###
--## PLATEFORME: PostgreSQL							###
--## AUTEURS: Equipe CRM - UdeS A17                 ###
--## DECEMBRE 2017                                  ###
--## COPYRIGHT (c)                                  ###
--#####################################################

-----users schema-----
SELECT setval('users."ROLEADM_idrole_seq"', 1, FALSE);
SELECT setval('users."UTILISATEUR_iduser_seq"', 1, FALSE);
SELECT setval('users."ENTITE_identite_seq"', 1, FALSE);
SELECT setval('users."OPERATION_idoperation_seq"', 1, FALSE);
SELECT setval('users."EMPLOYE_INT_idemploye_seq"', 1, FALSE);
SELECT setval('public."PERSONNE_idpersonne_seq"', 1, FALSE);

---ROLEADM---
INSERT INTO users."ROLEADM"(description) VALUES ('Administrateur');
INSERT INTO users."ROLEADM"(description) VALUES ('Associé');
INSERT INTO users."ROLEADM"(description) VALUES ('Consultant');
INSERT INTO users."ROLEADM"(description) VALUES ('Employé');
INSERT INTO users."ROLEADM"(description) VALUES ('Visiteur');


---OPERATION---
INSERT INTO users."OPERATION"(description) VALUES ('CREATE');
INSERT INTO users."OPERATION"(description) VALUES ('READ');
INSERT INTO users."OPERATION"(description) VALUES ('UPDATE');
INSERT INTO users."OPERATION"(description) VALUES ('DELETE');

---MENU---
INSERT INTO users."ENTITE"(description) VALUES ('Accueil');
INSERT INTO users."ENTITE"(description) VALUES ('Gestion des accès');
INSERT INTO users."ENTITE"(description) VALUES ('Gestion des utilisateurs');
INSERT INTO users."ENTITE"(description) VALUES ('Gestion des clients - ACollectives');
INSERT INTO users."ENTITE"(description) VALUES ('Gestion des prospects');
INSERT INTO users."ENTITE"(description) VALUES ('Gestion des fournisseurs');
INSERT INTO users."ENTITE"(description) VALUES ('Gestion des contrats - ACollectives');
INSERT INTO users."ENTITE"(description) VALUES ('Gestion des contrats - AIndiv');

---PERMISSIONR---
--Administateur--
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 1, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 1, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 1, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 1, 4);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 2, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 2, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 2, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 2, 4);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 3, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 3, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 3, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 3, 4);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 4, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 4, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 4, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 4, 4);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 5, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 5, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 5, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 5, 4);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 6, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 6, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 6, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 6, 4);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 7, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 7, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 7, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 7, 4);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 8, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 8, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 8, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 8, 4);

--Associé--
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 1, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 4, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 5, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 6, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 7, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 8, 1);

--Consultant--
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (3, 1, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (3, 4, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (3, 5, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (3, 6, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (3, 7, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (3, 8, 1);

--INVITE--
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (4, 1, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (4, 4, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (4, 7, 1);


--BEGINDATATEST
INSERT INTO users."UTILISATEUR"(login, password, mail, idrole) VALUES ('alain', '$2a$10$rJCeox4/QAS7licPO4CR2eBzMqmLlZGow5l.jfxfg2VRWxOGfXOoy', 'ceciestuntest@test.com', 1);
INSERT INTO users."UTILISATEUR"(login, password, mail, idrole) VALUES ('azizou', '$2a$10$rJCeox4/QAS7licPO4CR2eBzMqmLlZGow5l.jfxfg2VRWxOGfXOoy', 'azizou@gmail.com', 2);
INSERT INTO users."UTILISATEUR"(login, password, mail, idrole) VALUES ('maxime', '$2a$10$rJCeox4/QAS7licPO4CR2eBzMqmLlZGow5l.jfxfg2VRWxOGfXOoy', 'ceciestuntest@test.com', 3);
INSERT INTO users."UTILISATEUR"(login, password, mail, idrole) VALUES ('jean_neymar', '$2a$10$rJCeox4/QAS7licPO4CR2eBzMqmLlZGow5l.jfxfg2VRWxOGfXOoy', 'ceciestuntest@test.com', 4);

--ADMIN RIGHTS-- (alain)
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 1, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 1, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 1, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 1, 4);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 2, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 2, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 2, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 2, 4);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 3, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 3, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 3, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 3, 4);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 4, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 4, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 4, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 4, 4);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 5, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 5, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 5, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 5, 4);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 6, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 6, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 6, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 6, 4);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 7, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 7, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 7, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 7, 4);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 8, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 8, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 8, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 8, 4);

INSERT INTO public."PERSONNE"(nom, prenom, titre) VALUES ('Matest', 'Ia', 'Mr');
INSERT INTO users."EMPLOYE_INT"(iduser, idpersonne) VALUES (1, 1);

--User_All-- (azizou)
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 1, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 4, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 5, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 6, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 7, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 8, 1);

INSERT INTO public."PERSONNE"(nom, prenom, titre) VALUES ('Oukil', 'Aziz', 'Mr');
INSERT INTO users."EMPLOYE_INT"(iduser, idpersonne) VALUES (2, 2);

--User_limited-- (maxime)
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (3, 1, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (3, 4, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (3, 5, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (3, 6, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (3, 7, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (3, 8, 1);

INSERT INTO public."PERSONNE"(nom, prenom, titre) VALUES ('Atito', 'Maxime', 'Mr');
INSERT INTO users."EMPLOYE_INT"(iduser, idpersonne) VALUES (3, 3);
--ENDDATATEST

--Employé-- (jean)
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (4, 1, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (4, 4, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (4, 5, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (4, 6, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (4, 7, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (4, 8, 1);

INSERT INTO public."PERSONNE"(nom, prenom, titre) VALUES ('Neymar', 'Jean', 'Mr');
INSERT INTO users."EMPLOYE_INT"(iduser, idpersonne) VALUES (4, 4);
--ENDDATATEST

-----end user schema -----


-----public schema-----
SELECT setval('public."PROVENANCE_idprovenance_seq"', 1, FALSE);
SELECT setval('public."CLIENT_idclient_seq"', 1, FALSE);

INSERT INTO public."PROVENANCE"(libelleprovenance) VALUES ('Publicité Internet');
INSERT INTO public."PROVENANCE"(libelleprovenance) VALUES ('Démarchage');

INSERT INTO public."ETAT"(libelleetat) VALUES ('Actif');
INSERT INTO public."ETAT"(libelleetat) VALUES ('Inactif');

INSERT INTO public."CHAMBRE_COMMERCE"(description) VALUES ('Chambre de Sherbrooke');
-----end public schema -----


