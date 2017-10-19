--## SCRIPT DE CREATION DES TABLES Users						###
--## PLATEFORME: PostgreSQL								          ###
--## AUTEURS: Equipe CRM - UdeS A17                 ###
--## DECEMBRE 2017                                  ###
--## COPYRIGHT (c)                                  ###
--#####################################################

DROP TABLE IF EXISTS users."UTILISATEUR" CASCADE;
DROP TABLE IF EXISTS users."ROLEADM" CASCADE;
DROP TABLE IF EXISTS users."PERMISSION" CASCADE;
DROP TABLE IF EXISTS users."OPERATION" CASCADE;
DROP TABLE IF EXISTS users."MENU" CASCADE;
DROP TABLE IF EXISTS users."TAB" CASCADE;
DROP TABLE IF EXISTS users."CHAMP" CASCADE;
DROP TABLE IF EXISTS users."TYPE" CASCADE;

CREATE TABLE users."ROLEADM" (
  idrole serial PRIMARY KEY,
  description  varchar(30)
);

CREATE TABLE users."UTILISATEUR" (
  iduser serial PRIMARY KEY,
  login  varchar(20),
  password  varchar(20),
  idrole  integer REFERENCES users."ROLEADM" (idrole)
);

CREATE TABLE users."MENU" (
  idmenu serial PRIMARY KEY,
  description  varchar(30)
);

CREATE TABLE users."OPERATION" (
  idoperation serial PRIMARY KEY,
  description  varchar(30)
);

CREATE TABLE users."PERMISSION" (
  idpermission serial PRIMARY KEY,
  idrole  integer REFERENCES users."ROLEADM" (idrole),
  idmenu  integer REFERENCES users."MENU" (idmenu),
  idoperation  integer REFERENCES users."OPERATION" (idoperation)
);

CREATE TABLE users."TAB" (
  idtab serial PRIMARY KEY,
  description  varchar(30),
  idmenu  integer REFERENCES users."MENU" (idmenu)
);

CREATE TABLE users."TYPE" (
  idtype serial PRIMARY KEY,
  description  varchar(30)
);

CREATE TABLE users."CHAMP" (
  idchamp serial PRIMARY KEY,
  idtab  integer REFERENCES users."TAB" (idtab),
  idtype  integer REFERENCES users."TYPE" (idtype),
  description  varchar(30),
  priorité  integer,
  obligatoire  boolean,
  tab  varchar(30),
  nom  varchar(30)
);
