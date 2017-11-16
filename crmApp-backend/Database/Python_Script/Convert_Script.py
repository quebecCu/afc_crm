# coding=utf-8
import psycopg2
from lxml.html import parse
from config import config


def connect():
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # read connection parameters
        params = config()

        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)

        # create a cursor
        cur = conn.cursor()

        # importDataCSV(cur)
        import_data_htm(cur)

        # close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')


def import_data_htm(cur):
    """ Read the data from a HTM file and push it into the DB"""

    page = parse('GROUPAA.HTM')

    rows = page.xpath("body/table")[0].findall("tr")

    # Start the for at the second row
    header_listed = False
    headers = list()
    for row in rows:
        column_index = 0
        if header_listed:
            line = [c.text for c in row.getchildren()]

            # Check if row is not garbage
            if line[0]:
                # Execute a query
                cur.execute("", "")
                column_index += 1
        else:
            # Save the headers
            headers.append([c.text for c in row.getchildren()])
            header_listed = True


if __name__ == '__main__':
    connect()
