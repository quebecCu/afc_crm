--## SCRIPT DE SELECTION DE DONNEES 			    ###
--## PLATEFORME: PostgreSQL							###
--## AUTEURS: Equipe CRM - UdeS A17                 ###
--## DECEMBRE 2017                                  ###
--## COPYRIGHT (c)                                  ###
--#####################################################


--ALL INFORMATIONS ON ALL ENTREPRISEs--
SELECT * FROM "ENTREPRISE" AS entp
		LEFT JOIN "ENTREPRISE_FACUL" AS facul ON entp.idclient = facul.identreprise
        LEFT JOIN "ENTREPRISE_ATTR" AS attr USING (idattrentreprise)

--ALL OPTIONAL ROWS ON SPECIFIC ENTREPRISE--
SELECT attr.label, facul.valeur FROM "ENTREPRISE" AS entp
		LEFT JOIN "ENTREPRISE_FACUL" AS facul ON entp.idclient = facul.identreprise
        LEFT JOIN "ENTREPRISE_ATTR" AS attr USING (idattrentreprise)
WHERE entp.idclient = 1
