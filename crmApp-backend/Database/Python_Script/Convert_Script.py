# coding=utf-8
import re
import sys
from HTMLParser import HTMLParser

from lxml.html import parse

reload(sys)
sys.setdefaultencoding('utf-8')

htmlparser = HTMLParser()


def import_data_htm():
    """ Read the data from a HTM file and push it into the DB"""

    html_file = parse('GROUPAA.HTM')
    sql_file = open("Insert_GroupAA_Into_Db.sql", "w+")

    rows = html_file.xpath("body/table")[0].findall("tr")

    # Start the for at the second row
    header_listed = False
    headers = list()

    # sql_file.write("BEGIN;\n")

    for row in rows:
        column_index = 0

        if header_listed:
            line = [c.text for c in row.getchildren()]

            # Check if row is not garbage
            if line[0] and line[1]:

                insert_client(sql_file, line)
                insert_personne(sql_file, line)
                insert_contact_client(sql_file, line)
                insert_adresse_entreprise(sql_file, line)
                insert_entreprise(sql_file, line)
                insert_entreprise_facul_fax(sql_file, line)
                insert_entreprise_facul_email(sql_file, line)
                insert_entreprise_facul_nbr_employee(sql_file, line)

                sql_file.write("\n")

            column_index += 1
        else:
            # Save the headers
            headers.append([c.text for c in row.getchildren()])
            header_listed = True

    # sql_file.write("COMMIT;\n")


# Create Client
def insert_client(sql_file, line):
    # idclient
    idetat = 1  # Actif
    prospect = 'FALSE'  # No prospect found in the file
    notes = ("'" + htmlparser.unescape(line[13]).replace("'", "\'\'") + "'") if line[13] is not None else 'NULL'

    query = 'INSERT INTO ' \
            'public."CLIENT"(' \
            'idetat, ' \
            'prospect, ' \
            'notes) ' \
            'VALUES ' \
            '({0}, {1}, {2})' \
        .format(idetat, prospect, notes)

    sql_file.write(query + ";\n")


# Create Personne
def insert_personne(sql_file, line):
    nom = "'" + htmlparser.unescape(line[1]).replace("'", "\'\'") + "'"
    prenom = "'" + htmlparser.unescape(line[2]).replace("'", "\'\'") + "'"

    if htmlparser.unescape(line[3]) is "Monsieur":
        cleaned_title = "'Mr'"
    else:
        cleaned_title = "'Mme'"
    idtitre = '(' + \
              'SELECT idtitre ' \
              'FROM public."TITRE" ' \
              'WHERE lower(libelleTitre) ' \
              'LIKE lower({0})'.format(cleaned_title) + ')'
    date_naiss = ("to_date('" + htmlparser.unescape(line[19].replace("'", "\'\'")) +
                  "', 'YYYY-MM-DD')") if line[19] is not None else 'NULL'

    query = 'INSERT INTO ' \
            'public."PERSONNE"(' \
            'nom, ' \
            'prenom, ' \
            'idtitre, ' \
            'date_naiss) ' \
            'VALUES ' \
            '({0}, {1}, {2}, {3})' \
        .format(nom, prenom, idtitre, date_naiss)

    sql_file.write(query + ";\n")


# Create Contact_Client
def insert_contact_client(sql_file, line):
    idclient = '(' + \
               'SELECT idclient ' \
               'FROM public."CLIENT" ' \
               'ORDER BY idclient ' \
               'DESC LIMIT 1' + ')'
    idpersonne = '(' + \
                 'SELECT idpersonne ' \
                 'FROM public."PERSONNE" ' \
                 'ORDER BY idpersonne ' \
                 'DESC LIMIT 1' + ')'
    estdecideur = 'TRUE'

    query = 'INSERT INTO ' \
            'public."CONTACT_CLIENT"(idclient, idpersonne, estdecideur) ' \
            'VALUES ' \
            '({0}, {1}, {2})' \
        .format(idclient, idpersonne, estdecideur)

    sql_file.write(query + ";\n")


# Create Adresse Entreprise
def insert_adresse_entreprise(sql_file, line):
    rue = ("'" + htmlparser.unescape(line[4]).replace("'", "\'\'") + "'") if line[4] is not None else 'NULL'
    ville = ("'" + htmlparser.unescape(line[5]).replace("'", "\'\'") + "'") if line[5] is not None else 'NULL'
    province = ("'" + htmlparser.unescape(line[6]).replace("'", "\'\'") + "'") if line[6] is not None else 'NULL'
    codepostal = ("'" + htmlparser.unescape(line[7]).replace("'", "\'\'") + "'") if line[7] is not None else 'NULL'

    query = 'INSERT INTO ' \
            'public."ADRESSE"(' \
            'rue, ' \
            'ville, ' \
            'province, ' \
            'codepostal) ' \
            'VALUES ' \
            '({0}, {1}, {2}, {3})' \
        .format(rue, ville, province, codepostal)

    sql_file.write(query + ";\n")


# Create Entreprise
def insert_entreprise(sql_file, line):
    id_client = '(' + \
                'SELECT idclient ' \
                'FROM public."CLIENT" ' \
                'ORDER BY idclient ' \
                'DESC LIMIT 1' + ')'
    id_adresse = '(' + \
                 'SELECT idadresse ' \
                 'FROM public."ADRESSE" ' \
                 'ORDER BY idadresse ' \
                 'DESC LIMIT 1' + ')'
    id_activite = 'NULL'
    # chambre_commerce = ("'" + htmlparser.unescape(line[16].replace("'", "\'\'")) + "'") if line[16] is not None else 'NULL'
    tel_principal = (standardize_phone_number(htmlparser.unescape(line[8].replace("'", "\'\'")))) if line[8] is not None else 'NULL'
    ext_tel_principal = ("'" + htmlparser.unescape(line[9].replace("'", "\'\'")) + "'") if line[9] is not None else 'NULL'
    date_creation = ("to_date('" + htmlparser.unescape(line[81].replace("'", "\'\'")) + "-01-01', 'YYYY-MM-DD')") if line[81] is not None else 'NULL'
    # id_chambre_commerce = '(' + \
    #                       'SELECT idchambrecommerce ' \
    #                       'FROM public."CHAMBRE_COMMERCE" ' \
    #                       'WHERE lower(libellechambrecommerce) ' \
    #                       'LIKE lower({0})'.format(chambre_commerce) + ')'
    nom = ("'" + htmlparser.unescape(line[0].replace("'", "\'\'")) + "'") if line[0] is not None else 'NULL'

    query = 'INSERT INTO ' \
            'public."ENTREPRISE"(' \
            'idclient, ' \
            'idadresse, ' \
            'idactivite, ' \
            'nom, ' \
            'tel_principal, ' \
            'ext_tel_principal, ' \
            'date_creation) ' \
            'VALUES ' \
            '({0}, {1}, {2}, {3}, {4}, {5}, {6}) ' \
        .format(id_client,
                id_adresse,
                id_activite,
                nom,
                tel_principal,
                ext_tel_principal,
                date_creation)

    sql_file.write(query + ";\n")


# Create Entreprise_Facul_Fax
def insert_entreprise_facul_fax(sql_file, line):
    if line[10] is None:
        return

    idattrentreprise = '5'  # Fax

    identreprise = '(' + \
                   'SELECT idclient ' \
                   'FROM public."ENTREPRISE" ' \
                   'ORDER BY idclient ' \
                   'DESC LIMIT 1' + ')'

    valeur = standardize_phone_number(htmlparser.unescape(line[10].replace("'", "\'\'")))

    query = 'INSERT INTO ' \
            'public."ENTREPRISE_FACUL"(' \
            'idattrentreprise, ' \
            'identreprise, ' \
            'valeur) ' \
            'VALUES ' \
            '({0}, {1}, {2})' \
        .format(idattrentreprise, identreprise, valeur)

    sql_file.write(query + ";\n")


# Create Entreprise_Facul_Email
def insert_entreprise_facul_email(sql_file, line):
    if line[11] is None:
        return

    idattrentreprise = '2'  # Email

    identreprise = '(' + \
                   'SELECT idclient ' \
                   'FROM public."ENTREPRISE" ' \
                   'ORDER BY idclient ' \
                   'DESC LIMIT 1' + ')'

    valeur = "'" + htmlparser.unescape(line[11].replace("'", "\'\'")) + "'"

    query = 'INSERT INTO ' \
            'public."ENTREPRISE_FACUL"(' \
            'idattrentreprise, ' \
            'identreprise, ' \
            'valeur) ' \
            'VALUES ' \
            '({0}, {1}, {2})' \
        .format(idattrentreprise, identreprise, valeur)

    sql_file.write(query + ";\n")


# Create Entreprise_Facul_Nbr_Employee
def insert_entreprise_facul_nbr_employee(sql_file, line):
    if line[12] is None:
        return

    idattrentreprise = "1"  # Nbr Employe

    identreprise = '(' + \
                   'SELECT idclient ' \
                   'FROM public."ENTREPRISE" ' \
                   'ORDER BY idclient ' \
                   'DESC LIMIT 1' + ')'

    valeur = "'" + htmlparser.unescape(line[12].replace("'", "\'\'")) + "'"

    query = 'INSERT INTO ' \
            'public."ENTREPRISE_FACUL"(' \
            'idattrentreprise, ' \
            'identreprise, ' \
            'valeur) ' \
            'VALUES ' \
            '({0}, {1}, {2})' \
        .format(idattrentreprise, identreprise, valeur)

    sql_file.write(query + ";\n")


# Standardize Phone Number
def standardize_phone_number(number):
    cleaned_number = ""
    regex1 = re.compile(r'\(\d\d\d\)\d\d\d-\d\d\d\d')  # Wanted setup
    regex2 = re.compile(r'\(\d\d\d\)-\d\d\d-\d\d\d\d')
    regex3 = re.compile(r'\(\d\d\d\) \d\d\d-\d\d\d\d')
    regex4 = re.compile(r'\d\d\d-\d\d\d-\d\d\d\d')
    regex5 = re.compile(r'\d\d\d-\d\d\d\d')

    if regex1.search(number):
        cleaned_number = number
    elif regex2.search(number):
        cleaned_number = number[:5] + number[6:]
    elif regex3.search(number):
        cleaned_number = number[:5] + number[6:]
    elif regex4.search(number):
        cleaned_number = "(" + number[:3] + ")" + number[4:]
    elif regex5.search(number):
        cleaned_number = "(819)" + number  # TODO Check to use a true number instead
    return "'" + cleaned_number + "'"


if __name__ == '__main__':
    import_data_htm()
