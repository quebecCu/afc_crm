--## SCRIPT DE CREATION DES TABLES 								  ###
--## PLATEFORME: PostgreSQL								          ###
--## AUTEURS: Equipe CRM - UdeS A17                 ###
--## DECEMBRE 2017                                  ###
--## COPYRIGHT (c)                                  ###
--#####################################################

DROP TABLE IF EXISTS "ADRESSE" CASCADE;
DROP TABLE IF EXISTS "AVANTAGES" CASCADE;
DROP TABLE IF EXISTS "CONTACT_CLIENT" CASCADE;
DROP TABLE IF EXISTS "CONTACT_FOURNISSEUR" CASCADE;
DROP TABLE IF EXISTS "STATUT_CONTACT" CASCADE;
DROP TABLE IF EXISTS "RELEVE" CASCADE;
DROP TABLE IF EXISTS "PROVENANCE" CASCADE;
DROP TABLE IF EXISTS "AGA" CASCADE;
DROP TABLE IF EXISTS "CATEGORIE_ASSUREE" CASCADE;
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
DROP TABLE IF EXISTS "POSTE" CASCADE;
DROP TABLE IF EXISTS "CLIENT" CASCADE;
DROP TABLE IF EXISTS "ETAT" CASCADE;
DROP TABLE IF EXISTS "CONTRAT" CASCADE;
DROP TABLE IF EXISTS "CONTRAT_COLLECTIF" CASCADE;
DROP TABLE IF EXISTS "CONTRAT_INDIVIDUEL" CASCADE;
DROP TABLE IF EXISTS "MODULE" CASCADE;
DROP TABLE IF EXISTS "DOMAINE_ASSURANCE" CASCADE;
DROP TABLE IF EXISTS "SOUSCRIPTIONS" CASCADE;
DROP TABLE IF EXISTS "FOURNISSEUR" CASCADE;
DROP TABLE IF EXISTS "BENEFICIAIRES" CASCADE;
DROP TABLE IF EXISTS "REGLE" CASCADE;
DROP TABLE IF EXISTS "ACTIVITE" CASCADE;
DROP TABLE IF EXISTS "CHAMBRE_COMMERCE" CASCADE;

CREATE TABLE public."ADRESSE" (
  idadresse  serial PRIMARY KEY,
  rue  varchar(30),
  ville  varchar(20),
  province  varchar(10),
  codepostal  char(7)
);

CREATE TABLE public."STATUT_CONTACT" (
  idstatutcontact  serial  PRIMARY KEY,
  libellestatut  varchar(30)
);

CREATE TABLE public."RELEVE" (
  idreleve  serial  PRIMARY KEY,
  libellereleve  varchar(20)
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

CREATE TABLE public."PERSONNE" (
  idpersonne  serial PRIMARY KEY,
  nom  varchar(20) NOT NULL,
  prenom  varchar(30) NOT NULL,
  titre varchar(3) NOT NULL,
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
  nom  varchar(20) NOT NULL,
  code  varchar(20),
  date_creation date,
  carte_noel boolean,
  tag boolean,
  tel_principal varchar(10),
  ext_tel_principal varchar(3),
  tel_secondaire varchar(10),
  ext_tel_secondaire varchar (3),
  fax  char(10),
  mail  varchar(30),
  ligne800  varchar(10), --?
  nb_etq_a_imprimer  int2,
  pack1 varchar(30),
  pack2 varchar(30),
  min_emp1 integer,
  min_emp2 integer,
  div boolean,
  pae boolean,
  seuil decimal(10,2),
  force varchar(180),
  faible varchar(180),
  groupe varchar(20),
  sous_groupe varchar(20),
  services varchar(180),
  notes text
);

CREATE TABLE public."CATEGORIE"(
  idcategorie  serial  PRIMARY KEY,
  libellecategorie  varchar(20)
);

CREATE TABLE public."POSTE" (
  idposte serial PRIMARY KEY,
  libelleposte  varchar(20),
  idcategorie  integer REFERENCES "CATEGORIE" (idcategorie)
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
  notes text
);

CREATE TABLE public."DOMAINE_ASSURANCE" (
  iddomaineass  serial  PRIMARY KEY,
  libelledomaine  varchar(20)
);

CREATE TABLE public."MODALITE" (
  idmodalite  serial  PRIMARY KEY,
  libelleavantage  varchar(30),
  iddomaineass  integer  REFERENCES  "DOMAINE_ASSURANCE" (iddomaineass)
);

CREATE TABLE public."EMPLOYES" (
  idclient  integer  REFERENCES  "CLIENT" (idclient),
  idposte  integer  REFERENCES  "POSTE" (idposte),
  idpersonne  integer  REFERENCES  "PERSONNE" (idpersonne),
  date_emploi  date,
  salaire_annuel  decimal(10,2),
  statut_civil  varchar(20),
  CONSTRAINT  pk_EMPLOYES  PRIMARY KEY (idclient, idposte, idpersonne)
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

CREATE TABLE public."CONTRAT" (
  idcontrat  serial  PRIMARY KEY,
  idfournisseur  integer  REFERENCES "FOURNISSEUR" (idfournisseur),
  idclient  integer REFERENCES  "CLIENT" (idclient),
  idregle  integer REFERENCES  "REGLE" (idregle),
  idaga  integer REFERENCES  "AGA" (idaga),
  date_signature  date,
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
  libelleactivite  varchar(30)
);

CREATE TABLE public."CHAMBRE_COMMERCE" (
  idchambrecommerce  serial  PRIMARY KEY,
  libellechambrecommerce  varchar(30)
);

CREATE TABLE public."ENTREPRISE" (
  idclient  integer  PRIMARY KEY REFERENCES "CLIENT" (idclient),
  idadresse  integer  REFERENCES "ADRESSE" (idadresse),
  idreleve  integer  REFERENCES "RELEVE" (idreleve),
  nom  varchar(30) NOT NULL,
  tel_principal  char(10),
  ext_tel_principal  char(3),
  tel_secondaire  char(10),
  ext_tel_secondaire  char(3),
  fax  char(10),
  sous_groupe varchar(20),
  mail  varchar(30),
  poste varchar(10),
  date_creation  date  DEFAULT  current_date,
  mois_admissible integer,
  bc varchar(20),
  incomplet boolean,
  admin boolean,
  rver boolean,
  rver_rmq varchar(180),
  nb_etq_a_imprimer  int2,
  nb_mois_entente  integer, -- ?
  idrepresentant  integer  REFERENCES  "PERSONNE" (idpersonne),
  idchambrecommerce  integer  REFERENCES  "CHAMBRE_COMMERCE" (idchambrecommerce),
  idactivite  integer  REFERENCES  "ACTIVITE" (idactivite)
);

CREATE TABLE public."CONTACT_CLIENT" (
  idclient  integer  REFERENCES "CLIENT" (idclient),
  idpersonne  integer  REFERENCES "PERSONNE" (idpersonne),
  idstatutcontact  integer  REFERENCES  "STATUT_CONTACT" (idstatutcontact),
  CONSTRAINT  pk_CONTACT_CLIENT  PRIMARY KEY (idclient, idpersonne, idstatutcontact)
);

CREATE TABLE public."CONTACT_FOURNISSEUR" (
  idfournisseur  integer  REFERENCES "FOURNISSEUR" (idfournisseur),
  idpersonne  integer  REFERENCES "PERSONNE" (idpersonne),
  idstatutcontact  integer  REFERENCES  "STATUT_CONTACT" (idstatutcontact),
  CONSTRAINT  pk_CONTACT_FOURNISSEUR  PRIMARY KEY (idfournisseur, idpersonne, idstatutcontact)
);

CREATE TABLE public."CATEGORIE_ASSUREE" (
  idcontrat  integer  REFERENCES "CONTRAT" (idcontrat),
  idcategorie  integer  REFERENCES "CATEGORIE" (idcategorie),
  CONSTRAINT  pk_CATEGORIE_ASSUREE  PRIMARY KEY (idcontrat, idcategorie)

);

CREATE TABLE public."CONDITION" (
  idfournisseur  integer  REFERENCES "FOURNISSEUR" (idfournisseur),
  idmodalite  integer  REFERENCES "MODALITE" (idmodalite),
  CONSTRAINT  pk_CONDITION  PRIMARY KEY (idfournisseur, idmodalite),
  idtype  integer  REFERENCES "TYPE" (idtype),
  valeur varchar(20)
);
