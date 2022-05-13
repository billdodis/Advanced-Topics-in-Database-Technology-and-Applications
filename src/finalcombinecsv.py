import csv
import os
from re import search
global flag
flag = True # check if header has been written
global header
filelist = []
global allrows
allrows = []
familyarray = ['EN', 'SH', 'SP']
familyarray2 = [' EN', ' SH', ' SP']
contraband = 0


def fixrow(line):
    while True:
        k = line[3].split('.')
        print('k', k[0])
        if k[0] not in familyarray:
            line[3-1] += line[3]
            for y in range(3+1, len(line)-1):
                line[y-1] = line[y]
            line.remove(line[len(line) - 1])
        else:
            print(line)
            return line
    return line


def readfile(csvfile):
    global flag
    global header
    global allrows
    file = open(csvfile)
    csvreader = csv.reader(file)
    next(csvreader)
    next(csvreader)
    next(csvreader)
    next(csvreader)
    if flag:
        header = next(csvreader)
        flag = False
    else:
        next(csvreader)
    # print()
    rows = []
    counter = 0
    for row in csvreader:
        if len(row) > len(header):
            kappa = fixrow(row)
        else:
            kappa = row
        for i in range(0, len(kappa)-1):
            if i == 2:
                if ',' in kappa[i]:
                    listt = kappa[i].split(',')
                    kappa[i] = ''
                    for zz in listt:
                        kappa[i] += zz
            if i == 3:
                stringg = kappa[i]
            if i >= 4:
                if not kappa[i]:
                    kappa[i] = 0     # kanw ta kena mhdenika 0 gia na ta vazw sto average
        kappa.remove(kappa[len(kappa) - 1])
        newstring = stringg.split('.')
        if newstring[0] in familyarray or newstring[0] in familyarray2:
            allrows.append(kappa)

    file.close()


arr = os.listdir()
strcsv = ".csv"
for csvfile in arr:
    if csvfile.__contains__(strcsv):
        filelist.append(csvfile)
for y in filelist:
    readfile(y)
filename = 'Finalcombinedcsv2.csv'
header.remove(header[len(header)-1])
# Because the csv we have has one "extra" useless column so we delete it .
# The same we do for every row
with open(filename, 'w') as file:
    for header in header:
        file.write(str(header)+', ')
    file.write('\n')
    for row in allrows:
        for x in row:
            file.write(str(x)+', ')
        file.write('\n')
