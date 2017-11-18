# coding=utf-8
from lxml.html import parse


def import_data_htm():
    """ Read the data from a HTM file and push it into the DB"""

    html_file = parse('GROUPAA.HTM')
    sql_file = open("Insert_GroupAA_Into_Db.sql")

    rows = html_file.xpath("body/table")[0].findall("tr")

    # Start the for at the second row
    header_listed = False
    headers = list()

    for row in rows:
        column_index = 0

        if header_listed:
            line = [c.text for c in row.getchildren()]

            # Check if row is not garbage
            if line[0]:
                # Not garbage, save the insert script

                sql_file.write('INSERT INTO "public".')

                column_index += 1
        else:
            # Save the headers
            headers.append([c.text for c in row.getchildren()])
            header_listed = True


if __name__ == '__main__':
    import_data_htm()
