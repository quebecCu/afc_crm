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
)

CREATE TABLE public."FOURNISSEUR" (
  idfournisseur  serial  PRIMARY KEY,

)

CREATE TABLE public."CATEGORIE"(
  idcategorie  serial  PRIMARY KEY,
  libellecategorie  varchar(20)
)

CREATE TABLE public."POSTE" (
  idposte serial PRIMARY KEY,
  libelleposte  varchar(20),
  idcategorie  integer REFERENCES CATEGORIE (idcategorie)
)

CREATE TABLE public."ETAT" (
  idetat  serial  PRIMARY KEY,
  libelleetat  varchar(20)
)

CREATE TABLE public."ROLE" (
  idrole  serial  PRIMARY KEY,
  libellerole  varchar(30)
)

CREATE TABLE public."CLIENT" (
  idclient  serial  PRIMARY KEY,
  idetat  integer  REFERENCES ETAT (idetat)
)

CREATE TABLE public."DOMAINE_ASSURANCE" (
  iddomaineass  serial  PRIMARY KEY,
  libelledomaine  varchar(20)
)

CREATE TABLE public."AVANTAGES" (
  idavantage  serial  PRIMARY KEY,
  libelleavantage  varchar(30),
  iddomaineass  integer  REFERENCES  DOMAINE_ASSURANCE (iddomaineass)
)

CREATE TABLE public."EMPLOYES" (
)

CREATE TABLE public."RELATION" (

)

CREATE TABLE public."CONTRAT_INDIVIDUEL" (

)

CREATE TABLE public."CONTRAT_COLLECTIF" (

)

CREATE TABLE public."MODULE" (
  idmodule  serial  PRIMARY KEY,
  id
)

CREATE TABLE public."BENEFICIAIRES" (

)


CREATE TABLE public."SOUSCRIPTIONS" (

)

CREATE TABLE public."MODULE" (

)

CREATE TABLE public."CLIENT_INDIVIDUEL" (
)

CREATE TABLE public."ENTREPRISE" (

)
