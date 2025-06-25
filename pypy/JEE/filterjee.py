import csv
import json

# Load CSV data
with open('/Users/yuvi/mht cet tech/pypy/JEE/jee_main_merit_list.csv', 'r') as f:
    reader = csv.DictReader(f)
    csv_rows = [row for row in reader if row['Merit Exam'] not in ['MHT-CET', 'NEET-2024']]

# Save filtered CSV
with open('filtered_jee.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=csv_rows[0].keys())
    writer.writeheader()
    writer.writerows(csv_rows)

# Load JSON data
with open('/Users/yuvi/mht cet tech/pypy/JEE/jee_main_merit_list.json', 'r') as f:
    json_data = json.load(f)

# Filter JSON
filtered_json = [entry for entry in json_data if entry['Merit Exam'] not in ['MHT-CET', 'NEET-2024']]

# Save filtered JSON
with open('filtered_jee.json', 'w') as f:
    json.dump(filtered_json, f, indent=4)
