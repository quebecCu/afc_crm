BEGIN;
INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, 'CELL: 819-345-5516');
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('FABI', 'CHRISTIAN', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), to_date('2005-01-01', 'YYYY-MM-DD'));
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('981, RUE KING OUEST', 'SHERBROOKE', 'QUEBEC', 'J1H 1S3');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower('SHERBROOKE')), '2330-2029 Québec Inc (Oxybec)', '(819)566-8711', NULL, to_date('2006-01-01', 'YYYY-MM-DD'));
INSERT INTO public."ENTREPRISE_FACUL"(idattrentreprise, identreprise, valeur) VALUES (5, (SELECT idclient FROM public."ENTREPRISE" ORDER BY idclient DESC LIMIT 1), '(819)566-0371');
INSERT INTO public."ENTREPRISE_FACUL"(idattrentreprise, identreprise, valeur) VALUES (2, (SELECT idclient FROM public."ENTREPRISE" ORDER BY idclient DESC LIMIT 1), 'CFABI@OXYBEC.COM');

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, 'Jacques Simo, Marcial Racine');
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('Simo', 'Jacques', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), NULL);
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('1177 Des Tulippes', 'Sherbrooke', 'Québec', 'J1E 3X9');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower('Sherbrooke')), '3102-9648 QC inc. (Simo/Racine)', '(819)347-7697', NULL, to_date('2005-01-01', 'YYYY-MM-DD'));
INSERT INTO public."ENTREPRISE_FACUL"(idattrentreprise, identreprise, valeur) VALUES (5, (SELECT idclient FROM public."ENTREPRISE" ORDER BY idclient DESC LIMIT 1), '(819)822-7697');
INSERT INTO public."ENTREPRISE_FACUL"(idattrentreprise, identreprise, valeur) VALUES (2, (SELECT idclient FROM public."ENTREPRISE" ORDER BY idclient DESC LIMIT 1), 'jsimo@videotron.ca');

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, NULL);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('Lavigne', 'Michel', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), NULL);
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('508, rue De London', 'Sherbrooke', 'Québec', 'J1H 3M9');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower('Sherbrooke')), '3633781 Canada Inc.', '(819)823-7383', NULL, to_date('2003-01-01', 'YYYY-MM-DD'));

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, 'Denise Jutras');
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('Jutras', 'Denise', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), to_date('1997-05-01', 'YYYY-MM-DD'));
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('3235, rue Faucamp', 'Sherbrooke', 'Québec', 'J1K 2V7');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower('Sherbrooke')), 'A.B.C. de la Fête', '(819)565-2131', NULL, to_date('1997-01-01', 'YYYY-MM-DD'));

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, 'Prop. Michel Dessureault');
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('Dessureault', 'Fanie', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), to_date('1999-06-01', 'YYYY-MM-DD'));
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('373 rue Léger', 'Sherbrooke', 'Québec', 'J1L 2G7');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower(NULL)), 'Acier du Moulin inc.', '(819)564-1234', NULL, to_date('2011-01-01', 'YYYY-MM-DD'));
INSERT INTO public."ENTREPRISE_FACUL"(idattrentreprise, identreprise, valeur) VALUES (5, (SELECT idclient FROM public."ENTREPRISE" ORDER BY idclient DESC LIMIT 1), '(819)564-2640');
INSERT INTO public."ENTREPRISE_FACUL"(idattrentreprise, identreprise, valeur) VALUES (2, (SELECT idclient FROM public."ENTREPRISE" ORDER BY idclient DESC LIMIT 1), 'acier@acierdumoulin.ca');

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, NULL);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('L''Espérance', 'Johanne', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), NULL);
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('23 rue CateA', 'Sherbrooke', 'Québec', 'J1J 2N9');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower('Fleurimont')), 'Actuel Beauté', '(819)829-9777', NULL, to_date('2006-01-01', 'YYYY-MM-DD'));

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, 'res: 819-566-7605');
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('Giguère', 'Suzanne', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), NULL);
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('37 boul. Queen nord', 'Sherbrooke', 'Québec', 'J1H 3P4');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower('Sherbrooke')), 'Acuponcture Suzanne Giguère', '(819)821-4163', NULL, to_date('1999-01-01', 'YYYY-MM-DD'));
INSERT INTO public."ENTREPRISE_FACUL"(idattrentreprise, identreprise, valeur) VALUES (2, (SELECT idclient FROM public."ENTREPRISE" ORDER BY idclient DESC LIMIT 1), 'sgiguere2003@HOTMAIL.COM');

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, NULL);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('Meyniel', 'Michel', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), NULL);
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('330 chemin de la Rivière', 'North Hatley', 'Québec', 'J0B 2C0');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower('Magog')), 'Adawati', '(819)843-8480', NULL, to_date('2002-01-01', 'YYYY-MM-DD'));
INSERT INTO public."ENTREPRISE_FACUL"(idattrentreprise, identreprise, valeur) VALUES (5, (SELECT idclient FROM public."ENTREPRISE" ORDER BY idclient DESC LIMIT 1), '(819)843-8480');

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, NULL);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('Roy', 'Christian', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), NULL);
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('173 rue Nicolas-Viel', 'Magog', 'Québec', 'J1X 3V1');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower('Magog')), 'Alarme Multi Protec Inc', '(819)868-3807', NULL, to_date('2006-01-01', 'YYYY-MM-DD'));
INSERT INTO public."ENTREPRISE_FACUL"(idattrentreprise, identreprise, valeur) VALUES (5, (SELECT idclient FROM public."ENTREPRISE" ORDER BY idclient DESC LIMIT 1), '(819)868-3032');

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, NULL);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('Laporte', 'Julie', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), NULL);
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('1100, rue Didace', 'Magog', 'Québec', 'J1X 2P9');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower('Magog')), 'Aqua Pro-Jet', '(819)868-2720', NULL, to_date('2003-01-01', 'YYYY-MM-DD'));
INSERT INTO public."ENTREPRISE_FACUL"(idattrentreprise, identreprise, valeur) VALUES (5, (SELECT idclient FROM public."ENTREPRISE" ORDER BY idclient DESC LIMIT 1), '(819)868-9089');

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, 'cell:819-350-2036');
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('Carrier', 'Eric', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), NULL);
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('138 rang 6', 'Wotton', 'Québec', 'J0A 1N0');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower('Asbestos')), 'Arboriculture Carrier', '(819)839-1328', NULL, to_date('2005-01-01', 'YYYY-MM-DD'));

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, NULL);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('Turgeon', 'Jeanette', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), NULL);
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('34, de la Fauvette', 'Canton Magog', 'Québec', 'J1X 3W4');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower('Magog')), 'Artisans Magog', '(819)843-4872', NULL, to_date('1999-01-01', 'YYYY-MM-DD'));
INSERT INTO public."ENTREPRISE_FACUL"(idattrentreprise, identreprise, valeur) VALUES (5, (SELECT idclient FROM public."ENTREPRISE" ORDER BY idclient DESC LIMIT 1), '(819)843-8602');

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, 'Marcel Geoffroy');
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('Geoffroy', 'Marcel', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), NULL);
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('1645 rue King ouest suite 123', 'Sherbrooke', 'Québec', 'J1J 2C7');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower('Sherbrooke')), 'Ass. & Serv. Fin. M. Geoffroy', '(819)823-5323', NULL, to_date('1995-01-01', 'YYYY-MM-DD'));
INSERT INTO public."ENTREPRISE_FACUL"(idattrentreprise, identreprise, valeur) VALUES (5, (SELECT idclient FROM public."ENTREPRISE" ORDER BY idclient DESC LIMIT 1), '(819)823-8900');

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, NULL);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('Saulnier', 'Charles', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), NULL);
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('350 rue Terrill bureau 269', 'Sherbrooke', 'Québec', 'J1E 3S7');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower('Sherbrooke')), 'Ass. Régionale soccer Estrie', '(819)864-1322', NULL, to_date('2005-01-01', 'YYYY-MM-DD'));
INSERT INTO public."ENTREPRISE_FACUL"(idattrentreprise, identreprise, valeur) VALUES (5, (SELECT idclient FROM public."ENTREPRISE" ORDER BY idclient DESC LIMIT 1), '(819)864-1864');

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, 'Groupement CTA');
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('Mongeon', 'Julie', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), to_date('2005-11-01', 'YYYY-MM-DD'));
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('30 Ducharme', 'Gatineau', 'Québec', 'J8Y 3P6');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower(NULL)), 'Association Action Plus L.G.S.', '(819)770-2018', '20', to_date('2005-01-01', 'YYYY-MM-DD'));
INSERT INTO public."ENTREPRISE_FACUL"(idattrentreprise, identreprise, valeur) VALUES (2, (SELECT idclient FROM public."ENTREPRISE" ORDER BY idclient DESC LIMIT 1), 'jmongeon@resourceintegration.ca');

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, NULL);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('Arel', 'Luc', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), NULL);
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('671, Vaudreuil', 'Rock Forest', 'Québec', 'J1N 1X9');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower('Magog')), 'Aubaines Plus Luma', '(819)563-6939', NULL, to_date('2001-01-01', 'YYYY-MM-DD'));
INSERT INTO public."ENTREPRISE_FACUL"(idattrentreprise, identreprise, valeur) VALUES (5, (SELECT idclient FROM public."ENTREPRISE" ORDER BY idclient DESC LIMIT 1), '(819)564-3414');

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, NULL);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('Bouffard', 'Michel', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), NULL);
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('C.P.99', 'St-Denis deBrompton', 'Québec', 'J0B 2P0');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower('Rock Forest')), 'Auto Électrique Michel inc.', '(819)846-4710', NULL, to_date('1997-01-01', 'YYYY-MM-DD'));
INSERT INTO public."ENTREPRISE_FACUL"(idattrentreprise, identreprise, valeur) VALUES (5, (SELECT idclient FROM public."ENTREPRISE" ORDER BY idclient DESC LIMIT 1), '(819)846-0935');

INSERT INTO public."CLIENT"(idetat, prospect, notes) VALUES (1, FALSE, NULL);
INSERT INTO public."PERSONNE"(nom, prenom, idtitre, date_naiss) VALUES ('Audette', 'Daniel', (SELECT idtitre FROM public."TITRE" WHERE lower(libelleTitre) LIKE lower('Mme')), NULL);
INSERT INTO public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idpersonne FROM public."PERSONNE" ORDER BY idpersonne DESC LIMIT 1), TRUE);
INSERT INTO public."ADRESSE"(rue, ville, province, codepostal) VALUES ('4441 route 112', 'Ascot Corner', 'Québec', 'J0B 1A0');
INSERT INTO public."ENTREPRISE"(idclient, idadresse, idactivite, idchambrecommerce, nom, tel_principal, ext_tel_principal, date_creation) VALUES ((SELECT idclient FROM public."CLIENT" ORDER BY idclient DESC LIMIT 1), (SELECT idadresse FROM public."ADRESSE" ORDER BY idadresse DESC LIMIT 1), NULL, (SELECT idchambrecommerce FROM public."CHAMBRE_COMMERCE" WHERE lower(libellechambrecommerce) LIKE lower('Fleurimont')), 'Automobile Audette', '(819)823-7077', NULL, to_date('2006-01-01', 'YYYY-MM-DD'));

COMMIT;
