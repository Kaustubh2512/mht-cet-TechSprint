import csv
import json

input_csv = '../college_details.csv'
output_json = '../college_details_padded.json'

colleges = []

with open(input_csv, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        # Pad college_code to 5 digits as string
        row['college_code'] = str(row['college_code']).zfill(5)
        colleges.append(row)

with open(output_json, 'w', encoding='utf-8') as jsonfile:
    json.dump(colleges, jsonfile, ensure_ascii=False, indent=2)

print(f"Wrote {len(colleges)} colleges to {output_json}") 