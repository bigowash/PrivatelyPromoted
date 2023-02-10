# for i in range(1, 7):
#     print('"'+str(i)+'",', end="")

import json
import random
import math
import sys 
import json

print("in the PYTHOM file")

insightID = sys.argv[1]
userProfile = sys.argv[2]
print(insightID, userProfile)

# for arg in sys.argv: 
    # print(arg)
# print "Hello World!"
import os
# entries = os.listdir()
currentUsers = []

for root, dirs, files in os.walk('./web-app/static/database/userfiles'):
    currentUsers = files

# print(entries)

keys = ['Age', 'Gender', 'Location', 'Interests', 'Income', 'Education', 'Occupation', 'Marital status', 'Family size', 'Home ownership', 'Language', 'Ethnicity', 'Religion', 'Political affiliation', 'Purchasing behavior', 'Online behavior', 'Mobile Usage Behaviors']
keys_multiple = ['Interests', 'Language', 'Purchasing behavior', 'Online behavior', 'Mobile Usage Behaviors']
# insight_gen = [    "Amazon",    "Netflix",    "Spotify",    "YouTube",    "Facebook",    "Google",    "Instagram",    "TikTok",    "Pinterest",    "Twitter", "Experian",    "Equifax",    "TransUnion",    "Acxiom",    "Epsilon",    "Oracle Data Cloud",    "Neustar",    "Datalogix",    "LiveRamp",    "Epsilon"]

def add_to_json_file(file_path, data):
    with open(file_path, 'r') as file:
        existing_data = json.load(file)
        print("exist", existing_data)

    existing_data.update(data)
    # print("exist", existing_data)


    with open(file_path, 'w') as file:
        # json.dump(existing_data, file)
        json.dump(existing_data, file, indent=4)

# # Opening JSON file
with open('./web-app/static/database/preferences.json') as json_file:
    data = json.load(json_file)
    ke = list(data.keys())

    for i in range(1):
        # print(i)
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

                y = {}

                x = random.choices(data[j], k=random.randint(1, l))
                x = list(dict.fromkeys(x))
                y['values'] = x
                y['certainty'] = []
                y['selected'] = []
                y['source'] = []
                for u in range(len(x)):
                    y['selected'].append(True)
                    y['certainty'].append(random.randint(49, 100))
                    y['source'].append(insightID)
                temp[j] = y
            else:
                x = random.choice(data[j])
                y = {}
                y['selected'] = [True]
                y['values'] = [x]
                y['source'] = [insightID]
                y['certainty'] = [random.randint(49, 100)]
                temp[j] = y
        # print(temp)

        for j in ['Gender', 'Location', 'Age']:
            if j not in temp.keys():
                # print(j, "not in")
                x = random.choice(data[j])

                y = {}
                y['selected'] = [True]
                y['values'] = [x]
                y['source'] = [insightID]
                y['certainty'] = [random.randint(49, 100)]

                temp[j] = y
    

        file_name = "user-"+str(userProfile)
        print("./web-app/static/database/userfiles/"+file_name+".json")

        #erases current data
        # open("./web-app/static/database/"+file_name+".json", 'w').close()

        print(temp)
        add_to_json_file("./web-app/static/database/userfiles/"+file_name+".json", temp)

        # f = open("./web-app/static/database/userfiles/"+file_name+".json", "a")
        # f.write(json.dumps(temp))
        # f.close()
        # print("Written to file")
