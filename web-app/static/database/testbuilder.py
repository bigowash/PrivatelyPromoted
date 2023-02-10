# for i in range(1, 7):
#     print('"'+str(i)+'",', end="")

import json
import random
import math
import sys 
import json

# print("in the PYTHOM file")

# insightID = sys.argv[1]
# userProfile = sys.argv[2]
# print(insightID, userProfile)

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

insightID = 'Snapchat Ads'

def add_to_json_file(file_path, data):

    print()
    print(data)
    print()

    #if file does not currently exist, create one
    if True:
        
        r = {'Religion': {'selected': [True], 'values': ['Islam'], 'source': ['Snapchat Ads'], 'certainty': [86]}, 'Family size': {'selected': [True], 'values': ['2'], 'source': ['Snapchat Ads'], 'certainty': [53]}, 'Marital status': {'selected': [True], 'values': ['Married'], 'source': ['Snapchat Ads'], 'certainty': [88]}, 'Online behavior': {'values': ['Reading and writing reviews and ratings of products and services'], 'certainty': [59], 'selected': [True], 'source': ['Snapchat Ads']}, 'Political affiliation': {'selected': [True], 'values': ['Socialist'], 'source': ['Snapchat Ads'], 'certainty': [54]}, 'Purchasing behavior': {'values': ['Buying items in bulk to save money', 'Making impulsive purchases', 'Window shopping or browsing products before making a purchase', 'Comparing prices and features of similar products', 'Reading customer reviews and ratings'], 'certainty': [64, 62, 85, 78, 74], 'selected': [True, True, True, True, True], 'source': ['Snapchat Ads', 'Snapchat Ads', 'Snapchat Ads', 'Snapchat Ads', 'Snapchat Ads']}, 'Location': {'selected': [True], 'values': ['Algiers, Algiers Province, Algeria'], 'source': ['Snapchat Ads'], 'certainty': [55]}, 'Interests': {'values': ['Reading'], 'certainty': [60], 'selected': [True], 'source': ['Snapchat Ads']}, 'Gender': {'selected': [True], 'values': ['Female'], 'source': ['Snapchat Ads'], 'certainty': [88]}, 'Age': {'selected': [True], 'values': ['35'], 'source': ['Snapchat Ads'], 'certainty': [91]}}

        # print("Iterate thourhg the keys")
        for key in data.keys():
            # print(key)
            if key in r:
                print("Key already exists")
                flag = False
                print("starting the loop", r[key])
                if isinstance(r[key], list):
                    d = len(r[key])
                    isArray = True
                else:
                    d = 1
                    isArray = False
                for i in range(d):
                    # print("in this section key:", existing_data[key]["source"])
                    # print(insightID, r[key]["source"], data[key]["source"])
                    if isArray:
                        print("Check: ", insightID in r[key][i]["source"])
                        if insightID in r[key][i]["source"]:
                            # need to update this seciton
                            flag = True
                            print("changing the flag")
                            r[key][i] = [data[key]]
                            print("changing the e")
                    else:
                        print("Check: ", insightID in r[key]["source"])
                        if insightID in r[key]["source"]:
                            # need to update this seciton
                            flag = True
                            print("changing the flag")
                            r[key] = [data[key]]
                            print("changing the e")
                print("outside the loop")
                # else: 
                if not flag:
                    print(insightID, "NOT IN")
                    print(r[key])
                    r[key].append(data[key])
                    print(r[key])
            else:
                print("Key does not exist")
                r[key]= [data[key]]

        with open(file_path, 'w') as file:
            json.dump(r, file)
            # json.dump(existing_data, file, indent=4)
    else:
        r = {}
        for key in data.keys():
            r[key]= [data[key]]

        with open(file_path, 'w') as file:
            file.write(json.dumps(r))
    print("Adding / Creating files")
    

# # # Opening JSON file
# with open('./web-app/static/database/preferences.json') as json_file:
#     data = json.load(json_file)
#     ke = list(data.keys())

#     for i in range(1):
#         # print(i)
#         # create a user profile in json file

#         # add some preferences
#         el_to_remove = random.randint(1, 6)
#         el = random.choices(ke, k=len(ke)-el_to_remove)

#         temp = {}

#         for j in el:

#             val = []

#             if j in keys_multiple:
#                 l = len(data[j])/2
#                 l = math.floor(l)

#                 y = {}

#                 x = random.choices(data[j], k=random.randint(1, l))
#                 x = list(dict.fromkeys(x))
#                 y['values'] = x
#                 y['certainty'] = []
#                 y['selected'] = []
#                 y['source'] = []
#                 for u in range(len(x)):
#                     y['selected'].append(True)
#                     y['certainty'].append(random.randint(49, 100))
#                     y['source'].append(insightID)
#                 temp[j] = y
#             else:
#                 x = random.choice(data[j])
#                 y = {}
#                 y['selected'] = [True]
#                 y['values'] = [x]
#                 y['source'] = [insightID]
#                 y['certainty'] = [random.randint(49, 100)]
#                 temp[j] = y
#         # print(temp)

#         for j in ['Gender', 'Location', 'Age']:
#             if j not in temp.keys():
#                 # print(j, "not in")
#                 x = random.choice(data[j])

#                 y = {}
#                 y['selected'] = [True]
#                 y['values'] = [x]
#                 y['source'] = [insightID]
#                 y['certainty'] = [random.randint(49, 100)]

#                 temp[j] = y
    

#         file_name = "user-"+str(userProfile)
#         # print("./web-app/static/database/userfiles/"+file_name+".json")

#         #erases current data
#         # open("./web-app/static/database/"+file_name+".json", 'w').close()

#         # print(temp)
#         add_to_json_file("./web-app/static/database/userfiles/"+file_name+".json", temp)

#         # f = open("./web-app/static/database/userfiles/"+file_name+".json", "a")
#         # f.write(json.dumps(temp))
#         # f.close()
#         # print("Written to file")


dd = {'Purchasing behavior': {'values': ['Making impulsive purchases'], 'certainty': [99], 'selected': [True], 'source': ['Snapchat Ads']}, 'Gender': {'selected': [True], 'values': ['Female'], 'source': ['Snapchat Ads'], 'certainty': [51]}, 'Online behavior': {'values': ['Using online tools and applications for productivity, such as email and office suites', 'Searching for information using search engines', 'Connecting and communicating with others through social media and messaging apps', 'Online shopping and purchasing products'], 'certainty': [74, 79, 91, 50], 'selected': [True, True, True, True], 'source': ['Snapchat Ads', 'Snapchat Ads', 'Snapchat Ads', 'Snapchat Ads']}, 'Age': {'selected': [True], 'values': ['23'], 'source': ['Snapchat Ads'], 'certainty': [69]}, 'Interests': {'values': ['Reading', 'Football'], 'certainty': [85, 94], 'selected': [True, True], 'source': ['Snapchat Ads', 'Snapchat Ads']}, 'Education': {'selected': [True], 'values': ["Master's or equivalent level"], 'source': ['Snapchat Ads'], 'certainty': [86]}, 'Income': {'selected': [True], 'values': ['$150,000 to $199,999'], 'source': ['Snapchat Ads'], 'certainty': [82]}, 'Ethnicity': {'selected': [True], 'values': ['Pacific Islander'], 'source': ['Snapchat Ads'], 'certainty': [96]}, 'Marital status': {'selected': [True], 'values': ['In a Domestic Partnership'], 'source': ['Snapchat Ads'], 'certainty': [63]}, 'Location': {'selected': [True], 'values': ['Cairo, Cairo Governorate, Egypt'], 'source': ['Snapchat Ads'], 'certainty': [51]}}
add_to_json_file("fef", dd)
