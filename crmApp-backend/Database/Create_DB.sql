--## SCRIPT DE CREATION DES TABLES 								  ###
--## PLATEFORME: PostgreSQL								          ###
--## AUTEURS: Equipe CRM - UdeS A17                 ###
--## DECEMBRE 2017                                  ###
--## COPYRIGHT (c)                                  ###
--#####################################################

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
DROP TABLE IF EXISTS "AVANTAGES" CASCADE;
DROP TABLE IF EXISTS "FOURNISSEUR" CASCADE;
DROP TABLE IF EXISTS "BENEFICIAIRES" CASCADE;

CREATE TABLE public."PERSONNE" (
  idpersonne  serial PRIMARY KEY,
  nom  varchar(20) NOT NULL,
  prenom  varchar(30) NOT NULL,
  adresse  varchar(50),
  num_tel  varchar(10),
  mail  varchar(30)
);

CREATE TABLE public."FOURNISSEUR" (
  idfournisseur  serial  PRIMARY KEY
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
  idetat  integer  REFERENCES "ETAT" (idetat)
);

CREATE TABLE public."DOMAINE_ASSURANCE" (
  iddomaineass  serial  PRIMARY KEY,
  libelledomaine  varchar(20)
);

CREATE TABLE public."AVANTAGES" (
  idavantage  serial  PRIMARY KEY,
  libelleavantage  varchar(30),
  iddomaineass  integer  REFERENCES  "DOMAINE_ASSURANCE" (iddomaineass)
);

CREATE TABLE public."EMPLOYES" (
  idclient  integer  REFERENCES  "CLIENT" (idclient),
  idposte  integer  REFERENCES  "POSTE" (idposte),
  idpersonne  integer  REFERENCES  "PERSONNE" (idpersonne),
  date_emploi  date,
  salaire_annuel  decimal(10,2),
  statut  varchar(20),
  CONSTRAINT  pk_EMPLOYES  PRIMARY KEY (idclient, idposte, idpersonne)
);

CREATE TABLE public."RELATION" (
  idclient  integer  REFERENCES "CLIENT" (idclient),
  idpersonne  integer  REFERENCES "PERSONNE" (idpersonne),
  idrole  integer  REFERENCES  "ROLE" (idrole),
  CONSTRAINT  pk_RELATION  PRIMARY KEY (idclient, idpersonne, idrole)
);

CREATE TABLE public."CONTRAT" (
  idcontrat  serial  PRIMARY KEY,
  idfournisseur  integer  REFERENCES "FOURNISSEUR" (idfournisseur),
  idclient  integer REFERENCES  "CLIENT" (idclient)
);

CREATE TABLE public."CONTRAT_INDIVIDUEL" (
  idcontrat  integer  PRIMARY KEY REFERENCES "CONTRAT" (idcontrat)
);

CREATE TABLE public."CONTRAT_COLLECTIF" (
  idcontrat  integer  PRIMARY KEY REFERENCES "CONTRAT" (idcontrat),
  prime  integer,
  pdate  date,
  regle  integer,
  date_signature  date,
  idautrevendeur  integer  REFERENCES  PERSONNE (idpersonne)
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
  idavantage  integer  REFERENCES  "AVANTAGES" (idavantage),
  CONSTRAINT  pk_SOUSCRIPTIONS  PRIMARY KEY (idmodule, idavantage)
);

CREATE TABLE public."CLIENT_INDIVIDUEL" (
  idclient  integer  REFERENCES  "CLIENT" (idclient),
  idpersonne  integer  REFERENCES  "PERSONNE" (idpersonne),
  CONSTRAINT  pk_CLIENT_INDIVIDUEL  PRIMARY KEY (idclient, idpersonne)
);

CREATE TABLE public."ENTREPRISE" (
  idclient  integer  PRIMARY KEY REFERENCES "CLIENT" (idclient),
  nomentreprise  varchar(30) NOT NULL,
  addr_rue  varchar(30),
  addr_ville  varchar(20),
  addr_province  varchar(10),
  addr_codepostal  char(7),
  tel_principal  char(10),
  tel_secondaire  char(10),
  fax  char(10),
  mail  varchar(30),
  date_creation  date  DEFAULT  current_date,
  nb_etq_a_imprimer  int2,
  idsecretaire  integer  REFERENCES  PERSONNE (idpersonne),
  idresponsable  integer  REFERENCES  PERSONNE (idpersonne),
  idadministrateur  integer  REFERENCES  PERSONNE (idpersonne),
  idrepresentant  integer  REFERENCES  PERSONNE (idpersonne),
  idreference  integer  REFERENCES  PERSONNE (idpersonne),
  nb_mois_entente  integer
);
