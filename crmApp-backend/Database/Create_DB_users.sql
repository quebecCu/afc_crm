--## SCRIPT DE CREATION DES TABLES Users			###
--## PLATEFORME: PostgreSQL						    ###
--## AUTEURS: Equipe CRM - UdeS A17                 ###
--## DECEMBRE 2017                                  ###
--## COPYRIGHT (c)                                  ###
--#####################################################

DROP SCHEMA IF EXISTS users CASCADE;
CREATE SCHEMA IF NOT EXISTS users;

DROP TABLE IF EXISTS users."UTILISATEUR" CASCADE;
DROP TABLE IF EXISTS users."ROLEADM" CASCADE;
DROP TABLE IF EXISTS users."PERMISSIONROLE" CASCADE;
DROP TABLE IF EXISTS users."PERMISSIONUTIL" CASCADE;
DROP TABLE IF EXISTS users."INVITE" CASCADE;
DROP TABLE IF EXISTS users."OPERATION" CASCADE;
DROP TABLE IF EXISTS users."MENU" CASCADE;
DROP TABLE IF EXISTS users."TAB" CASCADE;
DROP TABLE IF EXISTS users."CHAMP" CASCADE;
DROP TABLE IF EXISTS users."TYPECHAMP" CASCADE;

CREATE TABLE users."ROLEADM" (
  idrole serial PRIMARY KEY,
  description  varchar(30)
);

CREATE TABLE users."UTILISATEUR" (
  iduser serial PRIMARY KEY,
  login  varchar(20),
  password  varchar(200),
  mail  varchar(40),
  name  varchar(20),
  idrole  integer REFERENCES users."ROLEADM" (idrole)
);

CREATE TABLE users."MENU" (
  idmenu serial PRIMARY KEY,
  description  varchar(60)
);

CREATE TABLE users."OPERATION" (
  idoperation serial PRIMARY KEY,
  description  varchar(30)
);

CREATE TABLE users."PERMISSIONROLE" (
  idrole  integer REFERENCES users."ROLEADM" (idrole),
  idmenu  integer REFERENCES users."MENU" (idmenu),
  idoperation  integer REFERENCES users."OPERATION" (idoperation),
  CONSTRAINT  pk_PERMISSIONROLE  PRIMARY KEY (idrole, idmenu, idoperation)
);

CREATE TABLE users."PERMISSIONUTIL" (
  iduser  integer REFERENCES users."UTILISATEUR" (iduser),
  idmenu  integer REFERENCES users."MENU" (idmenu),
  idoperation  integer REFERENCES users."OPERATION" (idoperation),
  CONSTRAINT  pk_PERMISSIONUTIL  PRIMARY KEY (iduser, idmenu, idoperation)
);

CREATE TABLE users."TAB" (
  idtab serial PRIMARY KEY,
  description  varchar(30),
  idmenu  integer REFERENCES users."MENU" (idmenu)
);

CREATE TABLE users."INVITE" (
  iduser  integer REFERENCES users."UTILISATEUR" (iduser),
  idclient  integer REFERENCES public."CLIENT" (idclient),
  CONSTRAINT  pk_INVITE  PRIMARY KEY (iduser, idclient) 
);

CREATE TABLE users."TYPECHAMP" (
  idtype serial PRIMARY KEY,
  description  varchar(30)
);

CREATE TABLE users."CHAMP" (
  idchamp serial PRIMARY KEY,
  idtab  integer REFERENCES users."TAB" (idtab),
  idtype  integer REFERENCES users."TYPECHAMP" (idtype),
  description  varchar(30),
  priorité  integer,
  obligatoire  boolean,
  tab  varchar(30),
  nom  varchar(30)
);