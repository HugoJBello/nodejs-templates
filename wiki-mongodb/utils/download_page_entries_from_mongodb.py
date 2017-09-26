def extract_entry(entry):
	entry_dic = list(entry)
	print(entry)
	content=entry['content']
	name = entry['name']
	date = str(entry['updated_at']).replace(':','_')
	cathegories = entry['cathegories']
	filename = name + '_' + date + '.txt'
	file= open(filename,'w')
	file.write(content)

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
#client = MongoClient('mongodb://localhost:27017/')
db = client['hjbello']

entries = db.PageEntries
entries_cursor = entries.find()

for entry in entries_cursor:
	extract_entry(entry)