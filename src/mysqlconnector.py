import pymysql
import re
import sys
import csv
global password                                 # -------------------------SOS----------------------------------------
password = "YOURMYSQLWORKBENCHPASSWORD"         # YOU HAVE TO CHANGE IT IN ORDER TO RUN IT!!!!!!!!!


def tablecomm():
    tablecommand = "CREATE TABLE data(cn VARCHAR(256),cc VARCHAR(256),indn VARCHAR(256),ic VARCHAR(256),"
    for i in range(1, 62):
        v = " v"+str(i)+" DOUBLE,"
        tablecommand += v
    tablecommand += " primary key(cc,ic))";
    return tablecommand


def command():  # ENCLOSED BY '"'     IGNORE 3 ROWS
    comm = """LOAD DATA LOCAL INFILE "C:/Users/user/Desktop/ΒΑΣΕΙΣ 2 ΧΩΡΕΣ/Finalcombinedcsv2.csv" 
    INTO TABLE data
    FIELDS TERMINATED BY ',' 
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS
    """+";"
    return comm


def csv_to_mysql():
    try:
        # connect to the database with your credentials
        con = pymysql.connect(host='127.0.0.1', user='root', password=password, autocommit=True, local_infile=1)
        print('Connected to DB: {}'.format('127.0.0.1'))
        # Create a 'cursor' and execute Load SQL
        cursor = con.cursor()
        # the cursor executes mysql commands from python
        # we will create and use the mydb database
        cursor.execute("CREATE DATABASE mydata;")
        cursor.execute("USE mydata;")
        # we will create the table data
        # the final_str will have dynamically all the indexes so we can
        # create the first row.
        # the last row will be the id auto incremented and defined as a primary key
        cursor.execute(tablecomm())
        # the sql_command is the LOAD DATA INFILE command below
        cursor.execute(command())
        print('Successfully loaded the table from csv.')
        cursor.execute("SHOW TABLES;")
        # close the connection
        con.close()

    except Exception as e:
        print('Error: {}'.format(str(e)))
        sys.exit(1)


csv_to_mysql()