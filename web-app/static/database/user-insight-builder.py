# for i in range(1, 7):
#     print('"'+str(i)+'",', end="")

import json
import random
import math
# import os
# entries = os.listdir()
# print(entries)

keys = ['Age', 'Gender', 'Location', 'Interests', 'Income', 'Education', 'Occupation', 'Marital status', 'Family size', 'Home ownership', 'Language', 'Ethnicity', 'Religion', 'Political affiliation', 'Purchasing behavior', 'Online behavior', 'Mobile Usage Behaviors']
keys_multiple = ['Interests', 'Language', 'Purchasing behavior', 'Online behavior', 'Mobile Usage Behaviors']

# # Opening JSON file
with open('./web-app/static/database/preferences.json') as json_file:
    data = json.load(json_file)
    ke = list(data.keys())

    for i in range(1, 5):
        # create a user profile in json file

        # add some preferences
        el_to_remove = random.randint(1, 6)
        el = random.choices(ke, k=len(ke)-el_to_remove)

        temp = {}

        for j in el:

            val = []

            if j in keys_multiple:
                l = len(data[j])/2
                l = math.floor(l)

                x = random.choices(data[j], k=random.randint(1, l))
                x = list(dict.fromkeys(x))
                temp[j] = x
            else:
                x = random.choice(data[j])
                temp[j] = [x]
        # print(temp)

        for j in ['Gender', 'Location', 'Age']:
            if j not in temp.keys():
                # print(j, "not in")
                y = random.choice(data[j])
                # print(y)
                # print(temp[j])
                temp[j] = [y]
    

        file_name = "user-"+str(i)

        #erases current data
        open("./web-app/static/database/"+file_name+".json", 'w').close()
        f = open("./web-app/static/database/"+file_name+".json", "a")
        f.write(json.dumps(temp))
        f.close()
