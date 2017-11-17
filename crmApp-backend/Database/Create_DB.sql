--## SCRIPT DE CREATION DES TABLES 				    ###
--## PLATEFORME: PostgreSQL							###
--## AUTEURS: Equipe CRM - UdeS A17                 ###
--## DECEMBRE 2017                                  ###
--## COPYRIGHT (c)                                  ###
--#####################################################

DROP TABLE IF EXISTS "ADRESSE" CASCADE;
DROP TABLE IF EXISTS "AVANTAGES" CASCADE;
DROP TABLE IF EXISTS "TITRE" CASCADE;
DROP TABLE IF EXISTS "CONTACT_CLIENT" CASCADE;
DROP TABLE IF EXISTS "CONTACT_FOURNISSEUR" CASCADE;
DROP TABLE IF EXISTS "STATUT_CONTACT" CASCADE;
DROP TABLE IF EXISTS "RELEVE" CASCADE;
DROP TABLE IF EXISTS "PROVENANCE" CASCADE;
DROP TABLE IF EXISTS "AGA" CASCADE;
DROP TABLE IF EXISTS "TYPE" CASCADE;
DROP TABLE IF EXISTS "MODALITE" CASCADE;
DROP TABLE IF EXISTS "CONDITION" CASCADE;
DROP TABLE IF EXISTS "ROLE" CASCADE;
DROP TABLE IF EXISTS "RELATION" CASCADE;
DROP TABLE IF EXISTS "PERSONNE" CASCADE;
DROP TABLE IF EXISTS "EMPLOYES" CASCADE;
DROP TABLE IF EXISTS "CATEGORIE" CASCADE;
DROP TABLE IF EXISTS "CLIENT_INDIVIDUEL" CASCADE;
DROP TABLE IF EXISTS "ENTREPRISE" CASCADE;
DROP TABLE IF EXISTS "ENTREPRISE_FACUL" CASCADE;
DROP TABLE IF EXISTS "ENTREPRISE_ATTR" CASCADE;
DROP TABLE IF EXISTS "POSTE" CASCADE;
DROP TABLE IF EXISTS "CLIENT" CASCADE;
DROP TABLE IF EXISTS "ETAT" CASCADE;
DROP TABLE IF EXISTS "CONTRAT" CASCADE;
DROP TABLE IF EXISTS "CONTRAT_COLLECTIF" CASCADE;
DROP TABLE IF EXISTS "CONTRAT_COLLECTIF_FACUL" CASCADE;
DROP TABLE IF EXISTS "CONTRAT_COLLECTIF_ATTR" CASCADE;
DROP TABLE IF EXISTS "CONTRAT_INDIVIDUEL" CASCADE;
DROP TABLE IF EXISTS "MODULE" CASCADE;
DROP TABLE IF EXISTS "DOMAINE_ASSURANCE" CASCADE;
DROP TABLE IF EXISTS "SOUSCRIPTIONS" CASCADE;
DROP TABLE IF EXISTS "FOURNISSEUR" CASCADE;
DROP TABLE IF EXISTS "FOURNISSEUR_FACUL" CASCADE;
DROP TABLE IF EXISTS "FOURNISSEUR_ATTR" CASCADE;
DROP TABLE IF EXISTS "BENEFICIAIRES" CASCADE;
DROP TABLE IF EXISTS "REGLE" CASCADE;
DROP TABLE IF EXISTS "ACTIVITE" CASCADE;
DROP TABLE IF EXISTS "CHAMBRE_COMMERCE" CASCADE;
DROP TABLE IF EXISTS "CADEAU_ENVOYE" CASCADE;
DROP TABLE IF EXISTS "CADEAU" CASCADE;
DROP TABLE IF EXISTS "CAT_ACTIVITE" CASCADE;

CREATE TABLE public."ADRESSE" (
  idadresse  serial PRIMARY KEY,
  rue  varchar(30),
  ville  varchar(20),
  province  varchar(10),
  codepostal  char(7)
);

CREATE TABLE public."RELEVE" (
  idreleve  serial  PRIMARY KEY,
  modeenvoiereleve  varchar(50)
);

CREATE TABLE public."PROVENANCE" (
  idprovenance  serial  PRIMARY KEY,
  libelleprovenance  varchar(30)
);

CREATE TABLE public."AGA" (
  idaga  serial  PRIMARY KEY,
  libelleaga  varchar(10)
);

CREATE TABLE public."TYPE" (
  idtype  serial  PRIMARY KEY,
  libelletype  varchar(10)
);

CREATE TABLE public."TITRE" (
  idtitre serial PRIMARY KEY,
  libelleTitre varchar(3)
);

CREATE TABLE public."PERSONNE" (
  idpersonne  serial PRIMARY KEY,
  nom  varchar(20) NOT NULL,
  prenom  varchar(30) NOT NULL,
  idtitre integer REFERENCES "TITRE" (idtitre) NOT NULL,
  date_naiss date,
  idadresse integer  REFERENCES  "ADRESSE" (idadresse),
  num_tel_principal  varchar(10),
  ext_tel_principal varchar(3),
  num_tel_secondaire  varchar(10),
  ext_tel_secondaire varchar(3),
  mail  varchar(30)
);


CREATE TABLE public."FOURNISSEUR" (
  idfournisseur  serial  PRIMARY KEY,
  idadresse integer  REFERENCES  "ADRESSE" (idadresse),
  nom  varchar(50) NOT NULL,
  code  varchar(20),
  date_creation date,
  --carte_noel boolean,
  --tag boolean,
  tel_principal varchar(10),
  ext_tel_principal varchar(3)
  --tel_secondaire varchar(10),
  --ext_tel_secondaire varchar (3),
  --fax  char(10),
  --mail  varchar(30),
  --ligne800  varchar(10), --?
  --nb_etq_a_imprimer  int2,
  --pack1 varchar(30),
  --pack2 varchar(30),
  --min_emp1 integer,
  --min_emp2 integer,
  --div boolean,
  --pae boolean,
  --seuil decimal(10,2),
  --force varchar(180),
  --faible varchar(180),
  --groupe varchar(20),
  --sous_groupe varchar(20),
  --services varchar(180),
  --notes text
);

CREATE TABLE public."CATEGORIE"(
  idcategorie  serial  PRIMARY KEY,
  libellecategorie  varchar(20)
);

CREATE TABLE public."POSTE" (
  idposte serial PRIMARY KEY,
  libelleposte  varchar(40)
);

CREATE TABLE public."ETAT" (
  idetat  serial  PRIMARY KEY,
  libelleetat  varchar(20)
);

CREATE TABLE public."ROLE" (
  idrole  serial  PRIMARY KEY,
  libellerole  varchar(30)
);

CREATE TABLE public."CLIENT" (
  idclient  serial  PRIMARY KEY,
  idetat  integer  REFERENCES "ETAT" (idetat),
  idprovenance  integer  REFERENCES "PROVENANCE" (idprovenance),
  prospect boolean,
  notes text
);

CREATE TABLE public."DOMAINE_ASSURANCE" (
  iddomaineass  serial  PRIMARY KEY,
  libelledomaine  varchar(20)
);

CREATE TABLE public."MODALITE" (
  idmodalite  serial  PRIMARY KEY,
  libelleavantage  varchar(30),
  iddomaineass  integer  REFERENCES  "DOMAINE_ASSURANCE" (iddomaineass),
  idcategorie  integer  REFERENCES "CATEGORIE" (idcategorie),
  idtype  integer  REFERENCES "TYPE" (idtype)
);

CREATE TABLE public."RELATION" (
  idclient  integer  REFERENCES "CLIENT" (idclient),
  idpersonne  integer  REFERENCES "PERSONNE" (idpersonne),
  idrole  integer  REFERENCES  "ROLE" (idrole),
  CONSTRAINT  pk_RELATION  PRIMARY KEY (idclient, idpersonne, idrole)
);

CREATE TABLE public."REGLE" (
  idregle  serial  PRIMARY KEY,
  libelleregle  varchar(20)
);

CREATE TABLE public."CADEAU" (
  idcadeau  serial  PRIMARY KEY,
  libellecadeau  varchar(30)
);

CREATE TABLE public."CONTRAT" (
  idcontrat  serial  PRIMARY KEY,
  idfournisseur  integer  REFERENCES "FOURNISSEUR" (idfournisseur),
  idclient  integer REFERENCES  "CLIENT" (idclient),
  idregle  integer REFERENCES  "REGLE" (idregle),
  idaga  integer REFERENCES  "AGA" (idaga),
  idrepresentant  integer  REFERENCES  "PERSONNE" (idpersonne),
  date_signature  date,
  mois_renouvellement  integer,
  police integer,
  notes text
);

CREATE TABLE public."CONTRAT_INDIVIDUEL" (
  idcontrat  integer  PRIMARY KEY REFERENCES "CONTRAT" (idcontrat)
);

CREATE TABLE public."CONTRAT_COLLECTIF" (
  idcontrat  integer  PRIMARY KEY REFERENCES "CONTRAT" (idcontrat),
  prime  integer,
  pdate  date,
  split  decimal(3,2),
  autre_vendeur_paye  decimal(10,2),
  autre_vendeur_datepaye  date,
  base  decimal(10,2),
  boni  decimal(3,2),
  bdu  decimal(10,2),
  hresmin  integer,
  misapied  integer,
  taux_commission  decimal(3,2),
  nb_employes integer,
  idautrevendeur  integer  REFERENCES  "PERSONNE" (idpersonne)
);

CREATE TABLE public."MODULE" (
  idmodule  serial  PRIMARY KEY,
  iddomaineass  integer REFERENCES "DOMAINE_ASSURANCE" (iddomaineass),
  idcontrat  integer  REFERENCES  "CONTRAT" (idcontrat),
  idfournisseur  integer  REFERENCES "FOURNISSEUR" (idfournisseur)
);

CREATE TABLE public."BENEFICIAIRES" (
  idpersonne  integer  REFERENCES  "PERSONNE" (idpersonne),
  idmodule  integer  REFERENCES  "MODULE" (idmodule),
  CONSTRAINT  pk_BENEFICIAIRES  PRIMARY KEY (idpersonne, idmodule)
);

CREATE TABLE public."SOUSCRIPTIONS" (
  idmodule  integer  REFERENCES  "MODULE" (idmodule),
  idmodalite  integer  REFERENCES  "MODALITE" (idmodalite),
  CONSTRAINT  pk_SOUSCRIPTIONS  PRIMARY KEY (idmodule, idmodalite),
  valeur varchar(20)
);
-- pk fk idcli ?
CREATE TABLE public."CLIENT_INDIVIDUEL" (
  idclient  integer  REFERENCES  "CLIENT" (idclient),
  idpersonne  integer  REFERENCES  "PERSONNE" (idpersonne),
  CONSTRAINT  pk_CLIENT_INDIVIDUEL  PRIMARY KEY (idclient, idpersonne)
);

CREATE TABLE public."ACTIVITE" (
  idactivite  serial  PRIMARY KEY,
  libelleactivite  varchar(80)
);

CREATE TABLE public."CHAMBRE_COMMERCE" (
  idchambrecommerce  serial  PRIMARY KEY,
  libellechambrecommerce  varchar(80)
);

CREATE TABLE public."ENTREPRISE" (
  idclient  integer  PRIMARY KEY REFERENCES "CLIENT" (idclient),
  idadresse  integer  REFERENCES "ADRESSE" (idadresse),
  idreleve  integer  REFERENCES "RELEVE" (idreleve),
  nom  varchar(30) NOT NULL,
  tel_principal  char(10),
  estProspect boolean,
 -- ext_tel_principal  char(3),
 -- tel_secondaire  char(10),
 -- ext_tel_secondaire  char(3),
 -- fax  char(10),
 -- sous_groupe varchar(20),
 -- mail  varchar(30),
  date_creation  date  DEFAULT  current_date,
 -- mois_admissible integer,
 -- nb_employes integer NOT NULL,
 -- bc varchar(20),
 -- incomplet boolean,
 -- admin boolean,
 -- rver boolean,
 -- rver_rmq varchar(180),
 -- nb_etq_a_imprimer  int2,
 -- nb_mois_entente  integer, -- ?
  idchambrecommerce  integer  REFERENCES  "CHAMBRE_COMMERCE" (idchambrecommerce),
  idactivite  integer  REFERENCES  "ACTIVITE" (idactivite)
);

CREATE TABLE public."FOURNISSEUR_ATTR" (
  idattrfournisseur  serial  PRIMARY KEY,
  idtype  integer  REFERENCES "TYPE" (idtype),
  label  varchar(40) NOT NULL,
  description  varchar(30),
  forme  varchar(100),
  valeur_defaut varchar(40),
  ext varchar(20)
);

CREATE TABLE public."ENTREPRISE_ATTR" (
  idattrentreprise  serial  PRIMARY KEY,
  idtype  integer  REFERENCES "TYPE" (idtype),
  label  varchar(40) NOT NULL,
  description  varchar(30),
  forme  varchar(100),
  valeur_defaut varchar(40),
  ext varchar(20)
);

CREATE TABLE public."CONTRAT_COLLECTIF_ATTR" (
  idattrcontratcoll  serial  PRIMARY KEY,
  idtype  integer  REFERENCES "TYPE" (idtype),
  label  varchar(20) NOT NULL,
  description  varchar(30),
  forme  varchar(100),
  valeur_defaut varchar(40)
);

CREATE TABLE public."FOURNISSEUR_FACUL" (
  idattrfournisseur  integer  REFERENCES "FOURNISSEUR_ATTR" (idattrfournisseur),
  idfournisseur  integer  REFERENCES "FOURNISSEUR" (idfournisseur),
  valeur varchar(40),
  CONSTRAINT  pk_FOURNISSEUR_FACUL  PRIMARY KEY (idattrfournisseur, idfournisseur)
);

CREATE TABLE public."CONTRAT_COLLECTIF_FACUL" (
  idattrcontratcoll  integer  REFERENCES "CONTRAT_COLLECTIF_ATTR" (idattrcontratcoll),
  idcontrat  integer  REFERENCES "CONTRAT_COLLECTIF" (idcontrat),
  valeur varchar(40),
  CONSTRAINT  pk_CONTRAT_COLLECTIF_FACUL  PRIMARY KEY (idattrcontratcoll, idcontrat)
);

CREATE TABLE public."ENTREPRISE_FACUL" (
  idattrentreprise  integer  REFERENCES "ENTREPRISE_ATTR" (idattrentreprise),
  identreprise  integer  REFERENCES "ENTREPRISE" (idclient),
  valeur varchar(40),
  CONSTRAINT  pk_ENTREPRISE_FACUL  PRIMARY KEY (idattrentreprise, identreprise)
);

CREATE TABLE public."CONTACT_CLIENT" (
  idclient  integer  REFERENCES "CLIENT" (idclient),
  idpersonne  integer  REFERENCES "PERSONNE" (idpersonne),
  idposte  integer  REFERENCES  "POSTE" (idposte),
  estDecideur  boolean,  
  CONSTRAINT  pk_CONTACT_CLIENT  PRIMARY KEY (idclient, idpersonne, idposte)
);

CREATE TABLE public."CONTACT_FOURNISSEUR" (
  idfournisseur  integer  REFERENCES "FOURNISSEUR" (idfournisseur),
  idpersonne  integer  REFERENCES "PERSONNE" (idpersonne),
  idposte  integer  REFERENCES  "POSTE" (idposte),
  CONSTRAINT  pk_CONTACT_FOURNISSEUR  PRIMARY KEY (idfournisseur, idpersonne, idposte)
);

CREATE TABLE public."CADEAU_ENVOYE" (
  idcadeau integer REFERENCES "CADEAU" (idcadeau),
  identreprise integer REFERENCES "ENTREPRISE" (idclient),
  description varchar (50),
  CONSTRAINT  pk_CADEAU_ENVOYE  PRIMARY KEY (idcadeau, identreprise)
);

CREATE TABLE public."CONDITION" (
  idfournisseur  integer  REFERENCES "FOURNISSEUR" (idfournisseur),
  idmodalite  integer  REFERENCES "MODALITE" (idmodalite),
  CONSTRAINT  pk_CONDITION  PRIMARY KEY (idfournisseur, idmodalite),
  idtype  integer  REFERENCES "TYPE" (idtype),
  valeur varchar(20)
);

CREATE TABLE public."CAT_ACTIVITE" (
  idposte integer REFERENCES "POSTE" (idposte),
  idcategorie integer REFERENCES "CATEGORIE" (idcategorie),
  CONSTRAINT  pk_CAT_ACTIVITE  PRIMARY KEY (idposte, idcategorie)
);
