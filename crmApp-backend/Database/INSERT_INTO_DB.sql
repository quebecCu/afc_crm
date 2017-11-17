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
SELECT setval('public."TITRE_idtitre_seq"', 1, FALSE);

---ROLEADM---
INSERT INTO users."ROLEADM"(description,isAdmin) VALUES ('Administrateur', TRUE);
INSERT INTO users."ROLEADM"(description,isAdmin) VALUES ('Associé', FALSE);
INSERT INTO users."ROLEADM"(description,isAdmin) VALUES ('Consultant', FALSE);
INSERT INTO users."ROLEADM"(description,isAdmin) VALUES ('Employé', FALSE);
INSERT INTO users."ROLEADM"(description,isAdmin) VALUES ('Visiteur', FALSE);


---OPERATION---
INSERT INTO users."OPERATION"(description, level) VALUES ('READ', 1);
INSERT INTO users."OPERATION"(description, level) VALUES ('UPDATE', 2);
INSERT INTO users."OPERATION"(description, level) VALUES ('CREATE', 4);

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
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 2, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 2, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 2, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 3, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 3, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 3, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 4, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 4, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 4, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 5, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 5, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 5, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 6, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 6, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 6, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 7, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 7, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 7, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 8, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 8, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (1, 8, 3);

--Associé--
--INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 1, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 4, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 4, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 4, 3);
--INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 5, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 6, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 6, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 6, 3);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 7, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 7, 2);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 7, 3);
--INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (2, 8, 1);

--Consultant--
--INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (3, 1, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (3, 4, 1);
--INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (3, 5, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (3, 6, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (3, 7, 1);
--INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (3, 8, 1);

--Employé--
--INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (4, 1, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (4, 4, 1);
--INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (4, 5, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (4, 6, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (4, 7, 1);
--INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (4, 8, 1);

--Visiteur--
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (5, 1, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (5, 4, 1);
INSERT INTO users."PERMISSIONROLE_GLOB"(idrole, identite, idoperation) VALUES (5, 7, 1);


--BEGINDATATEST
INSERT INTO users."UTILISATEUR"(login, password, mail, idrole) VALUES ('alain', '$2a$10$rJCeox4/QAS7licPO4CR2eBzMqmLlZGow5l.jfxfg2VRWxOGfXOoy', 'ceciestuntest@test.com', 1);
INSERT INTO users."UTILISATEUR"(login, password, mail, idrole) VALUES ('azizou', '$2a$10$rJCeox4/QAS7licPO4CR2eBzMqmLlZGow5l.jfxfg2VRWxOGfXOoy', 'azizou@gmail.com', 2);
INSERT INTO users."UTILISATEUR"(login, password, mail, idrole) VALUES ('maxime', '$2a$10$rJCeox4/QAS7licPO4CR2eBzMqmLlZGow5l.jfxfg2VRWxOGfXOoy', 'ceciestuntest@test.com', 3);
INSERT INTO users."UTILISATEUR"(login, password, mail, idrole) VALUES ('jean_neymar', '$2a$10$rJCeox4/QAS7licPO4CR2eBzMqmLlZGow5l.jfxfg2VRWxOGfXOoy', 'ceciestuntest@test.com', 4);

--TITRE--
INSERT INTO public."TITRE"(libelletitre) VALUES ('Mr');
INSERT INTO public."TITRE"(libelletitre) VALUES ('Mme');

--ADMIN RIGHTS-- (alain)
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 1, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 1, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 1, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 2, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 2, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 2, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 3, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 3, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 3, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 4, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 4, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 4, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 5, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 5, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 5, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 6, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 6, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 6, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 7, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 7, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 7, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 8, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 8, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (1, 8, 3);

INSERT INTO public."PERSONNE"(nom, prenom, idtitre) VALUES ('Rey', 'Alain', 1);
INSERT INTO users."EMPLOYE_INT"(iduser, idpersonne) VALUES (1, 1);

--Associé-- (azizou)
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 4, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 4, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 4, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 6, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 6, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 6, 3);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 7, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 7, 2);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (2, 7, 3);

INSERT INTO public."PERSONNE"(nom, prenom, idtitre) VALUES ('Oukilou', 'Aziz', 1);
INSERT INTO users."EMPLOYE_INT"(iduser, idpersonne) VALUES (2, 2);

--Consultant-- (maxime)
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (3, 4, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (3, 6, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (3, 7, 1);

INSERT INTO public."PERSONNE"(nom, prenom, idtitre) VALUES ('Atito', 'Maxime', 1);
INSERT INTO users."EMPLOYE_INT"(iduser, idpersonne) VALUES (3, 3);
--ENDDATATEST

--Employé-- (jean)
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (4, 4, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (4, 6, 1);
INSERT INTO users."PERMISSIONUTIL_GLOB"(iduser, identite, idoperation) VALUES (4, 7, 1);

INSERT INTO public."PERSONNE"(nom, prenom, idtitre) VALUES ('Neymarito', 'Jean', 1);
INSERT INTO users."EMPLOYE_INT"(iduser, idpersonne) VALUES (4, 4);
--ENDDATATEST

-----end user schema -----


-----public schema-----
SELECT setval('public."PROVENANCE_idprovenance_seq"', 1, FALSE);
SELECT setval('public."CLIENT_idclient_seq"', 1, FALSE);
SELECT setval('public."ADRESSE_idadresse_seq"', 1, FALSE);
SELECT setval('public."ETAT_idetat_seq"', 1, FALSE);
SELECT setval('public."RELEVE_idreleve_seq"', 1, FALSE);
SELECT setval('public."AGA_idaga_seq"', 1, FALSE);
SELECT setval('public."TYPE_idtype_seq"', 1, FALSE);
SELECT setval('public."FOURNISSEUR_idfournisseur_seq"', 1, FALSE);
SELECT setval('public."CATEGORIE_idcategorie_seq"', 1, FALSE);
SELECT setval('public."POSTE_idposte_seq"', 1, FALSE);
SELECT setval('public."ROLE_idrole_seq"', 1, FALSE);
SELECT setval('public."DOMAINE_ASSURANCE_iddomaineass_seq"', 1, FALSE);
SELECT setval('public."MODALITE_idmodalite_seq"', 1, FALSE);
SELECT setval('public."REGLE_idregle_seq"', 1, FALSE);
SELECT setval('public."CADEAU_idcadeau_seq"', 1, FALSE);
SELECT setval('public."MODULE_idmodule_seq"', 1, FALSE);
SELECT setval('public."ACTIVITE_idactivite_seq"', 1, FALSE);
SELECT setval('public."CHAMBRE_COMMERCE_idchambrecommerce_seq"', 1, FALSE);
SELECT setval('public."FOURNISSEUR_ATTR_idattrfournisseur_seq"', 1, FALSE);
SELECT setval('public."ENTREPRISE_ATTR_idattrentreprise_seq"', 1, FALSE);
SELECT setval('public."CONTRAT_COLLECTIF_ATTR_idattrcontratcoll_seq"', 1, FALSE);

--TYPE--
INSERT INTO public."TYPE"(libelletype) VALUES ('int');
INSERT INTO public."TYPE"(libelletype) VALUES ('String');
INSERT INTO public."TYPE"(libelletype) VALUES ('Date');
INSERT INTO public."TYPE"(libelletype) VALUES ('bool');

--POSTE--

INSERT INTO public."POSTE"(libelleposte) VALUES ('Représentant');
INSERT INTO public."POSTE"(libelleposte) VALUES ('Adjoint interne');
INSERT INTO public."POSTE"(libelleposte) VALUES ('Soumissions');
INSERT INTO public."POSTE"(libelleposte) VALUES ('Administration');
INSERT INTO public."POSTE"(libelleposte) VALUES ('Réclamations');
INSERT INTO public."POSTE"(libelleposte) VALUES ('Service aux conseillers');
INSERT INTO public."POSTE"(libelleposte) VALUES ('Services à la clientèle');
INSERT INTO public."POSTE"(libelleposte) VALUES ('Participants du régime');

--PROVENANCE--
INSERT INTO public."PROVENANCE"(libelleprovenance) VALUES ('Publicité Internet');
INSERT INTO public."PROVENANCE"(libelleprovenance) VALUES ('Démarchage');
INSERT INTO public."PROVENANCE"(libelleprovenance) VALUES ('Bouche à oreilles');

--ETAT--
INSERT INTO public."ETAT"(libelleetat) VALUES ('Actif');
INSERT INTO public."ETAT"(libelleetat) VALUES ('Inactif');

--CHAMBRE COMMERCE--
INSERT INTO public."CHAMBRE_COMMERCE"(libellechambrecommerce) VALUES ('Chambre de Sherbrooke');
INSERT INTO public."CHAMBRE_COMMERCE"(libellechambrecommerce) VALUES ('Chambre de Drummmondville');
INSERT INTO public."CHAMBRE_COMMERCE"(libellechambrecommerce) VALUES ('Chambre de Magog-Orford');
INSERT INTO public."CHAMBRE_COMMERCE"(libellechambrecommerce) VALUES ('Chambre de Richmond');
INSERT INTO public."CHAMBRE_COMMERCE"(libellechambrecommerce) VALUES ('Autres');

--ACTIVITE--
INSERT INTO public."ACTIVITE"(libelleactivite) VALUES ('Construction');
INSERT INTO public."ACTIVITE"(libelleactivite) VALUES ('Commerce au détail ou grossiste');
INSERT INTO public."ACTIVITE"(libelleactivite) VALUES ('Entreprise de service');
INSERT INTO public."ACTIVITE"(libelleactivite) VALUES ('Ferme/Forest');
INSERT INTO public."ACTIVITE"(libelleactivite) VALUES ('Manufacture');
INSERT INTO public."ACTIVITE"(libelleactivite) VALUES ('Organisme à but non-lucratif');

--ADRESSE--
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('Boul. université', 'Sherbrooke', 'Quebec', 'J1K2N4');
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('Rue du sugarbaby', 'Sherbrooke', 'Quebec', 'J1K2R1');
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('Rue du sugardaddy', 'Sherbrooke', 'Quebec', 'J1K2R1');

--CADEAU--
INSERT INTO public."CADEAU"(libellecadeau) VALUES ('Bulletin');
INSERT INTO public."CADEAU"(libellecadeau) VALUES ('Calendrier');
INSERT INTO public."CADEAU"(libellecadeau) VALUES ('Carte de fête');
INSERT INTO public."CADEAU"(libellecadeau) VALUES ('Carte de noel');
INSERT INTO public."CADEAU"(libellecadeau) VALUES ('Autres');

--RELEVE--
INSERT INTO public."RELEVE"(modeenvoiereleve) VALUES ('Courriel');
INSERT INTO public."RELEVE"(modeenvoiereleve) VALUES ('Poste');
INSERT INTO public."RELEVE"(modeenvoiereleve) VALUES ('Telecopieur');
INSERT INTO public."RELEVE"(modeenvoiereleve) VALUES ('Non');
INSERT INTO public."RELEVE"(modeenvoiereleve) VALUES ('Autres');

--CLIENT--
INSERT INTO public."CLIENT"(idetat, idprovenance, prospect, notes) VALUES (1, 1, false, 'Ce client veut des pigeons voyageurs à chaque 2eme mercredi du mois');
INSERT INTO public."CLIENT"(idetat, idprovenance, prospect, notes) VALUES (2, 3, true, 'Ce client a toujours chaud');

--ENTREPRISE--
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idreleve, idactivite, idchambrecommerce, nom, nb_employes) VALUES (1, 2, 1, 3, 1, 'Sugar baby Inc', 10);
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idreleve, idactivite, idchambrecommerce, nom, nb_employes) VALUES (2, 1, 2, 1, 3, 'Sugar daddy Inc', 150);


--ENTREPRISE_FAC--
INSERT INTO public."ENTREPRISE_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'Nombre d''employés', 'Indiquez le nombre d''employés', null, null);
INSERT INTO public."ENTREPRISE_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'Courriel', 'Courriel', null, null);
INSERT INTO public."ENTREPRISE_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'Téléphone secondaire', 'Numéro de téléphone secondaire', null, null);
INSERT INTO public."ENTREPRISE_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'Ext', 'Extension', null, null);
INSERT INTO public."ENTREPRISE_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'Fax', 'Télécopieur', null, null);
INSERT INTO public."ENTREPRISE_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'Ext', 'Extension', null, null);
INSERT INTO public."ENTREPRISE_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'Fax', 'Télécopieur', null, null);

--FOURNISSEUR_FAC--
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (4, 'Petits groupes', 'Petits groupes', null, null);
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (1, 'Nombre minimum petits groupes', 'Nombre minimum d''employés', null, null);
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (4, 'Grands groupes', 'Grands groupes', null, null);
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (1, 'Nombre minimum grands groupes', 'Nombre minimum d''employés', null, null);
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (1, 'Dividendes', 'Revenus de dividendes assurables ?', null, null);
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (4, 'PAE', 'Programme d''aide aux employés inclus avec l''ILD ?', null, null);
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut, ext) VALUES (1, 'Annulation ?', 'Annulation voyage ?', null, null, '00 000$');
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut, ext) VALUES (1, 'Bagages ?', 'Assurance bagages ?', null, null, '0 000$');
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut, ext) VALUES (1, 'Voyage #jours', 'Nombre de jours maximum', null, null, '000');
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut, ext) VALUES (1, 'Voyage #$', 'Maximum payable', null, null, '00 000 000$');
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut, ext) VALUES (1, 'Seuil de mutualisation', 'Seuil de mutualisation', null, null, '00 000$');
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut, ext) VALUES (1, 'Âge maximum en AMC', 'Âge maximum en AMC', null, null, 'ans');
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut, ext) VALUES (1, '#Mois de garantie', '#Mois de garantie de taux démographique', null, null, 'mois');
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'FORCE', 'Forces', null, null);
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'FAIBLE', 'Faiblesses', null, null);
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'MEMO', 'Mémo', null, null);
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'SERVICES', 'Services', null, null);
INSERT INTO public."FOURNISSEUR_ATTR" (idtype, label, description, forme, valeur_defaut) VALUES (2, 'AUTRES', 'Autres', null, null);

--PERSONNE--
INSERT INTO public."PERSONNE"(nom, prenom, idtitre) VALUES ('Oukil', 'Aziz', 1);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre) VALUES ('Matest', 'Ia', 1);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre) VALUES ('Neymar', 'Jean', 1);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre) VALUES ('Ana', 'Pasfaitlescourses', 2);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre) VALUES ('Adam', 'Troisjour', 1);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre) VALUES ('Philippe', 'Opotamsituveux', 1);

-----end public schema -----


