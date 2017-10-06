--## SCRIPT DE CREATION DES TABLES USERS						###
--## PLATEFORME: PostgreSQL								          ###
--## AUTEURS: Equipe CRM - UdeS A17                 ###
--## DECEMBRE 2017                                  ###
--## COPYRIGHT (c)                                  ###
--#####################################################

DROP TABLE IF EXISTS "UTILISATEUR" CASCADE;
DROP TABLE IF EXISTS "ROLEADM" CASCADE;
DROP TABLE IF EXISTS "PERMISSION" CASCADE;
DROP TABLE IF EXISTS "OPERATION" CASCADE;
DROP TABLE IF EXISTS "MENU" CASCADE;
DROP TABLE IF EXISTS "TAB" CASCADE;
DROP TABLE IF EXISTS "CHAMP" CASCADE;
DROP TABLE IF EXISTS "TYPE" CASCADE;

CREATE TABLE public."ROLEADM" (
  idrole serial PRIMARY KEY,
  description  varchar(30)
);

CREATE TABLE public."UTILISATEUR" (
  iduser serial PRIMARY KEY,
  login  varchar(20),
  password  varchar(20),
  idrole  integer REFERENCES "ROLEADM" (idrole)
);

CREATE TABLE public."MENU" (
  idmenu serial PRIMARY KEY,
  description  varchar(30)
);

CREATE TABLE public."OPERATION" (
  idoperation serial PRIMARY KEY,
  description  varchar(30)
);

CREATE TABLE public."PERMISSION" (
  idpermission serial PRIMARY KEY,
  idrole  integer REFERENCES "ROLEADM" (idrole),
  idmenu  integer REFERENCES "MENU" (idmenu),
  idoperation  integer REFERENCES "OPERATION" (idoperation)
);

CREATE TABLE public."TAB" (
  idtab serial PRIMARY KEY,
  description  varchar(30),
  idmenu  integer REFERENCES "MENU" (idmenu)
);

CREATE TABLE public."TYPE" (
  idtype serial PRIMARY KEY,
  description  varchar(30)
);

CREATE TABLE public."CHAMP" (
  idchamp serial PRIMARY KEY,
  idtab  integer REFERENCES "TAB" (idtab),
  idtype  integer REFERENCES "TYPE" (idtype),
  description  varchar(30),
  priorité  integer,
  obligatoire  boolean,
  tab  varchar(30),
  nom  varchar(30)
);
