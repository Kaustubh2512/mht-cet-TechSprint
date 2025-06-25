import pdfplumber
import re
import csv
import json

pdf_path = '/Users/yuvi/mht cet tech/pypy/JEE/JEE Cutoff.pdf'
csv_path = '/Users/yuvi/mht cet tech/pypy/JEE/jee_main_merit_list.csv'
json_path = '/Users/yuvi/mht cet tech/pypy/JEE/jee_main_merit_list.json'

results = []

with pdfplumber.open(pdf_path) as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        lines = text.split("\n")
        for line in lines:
            # Match pattern: Rank (Percentile) ChoiceCode (10-digit)
            match = re.search(r"(\d+)\s+\(([\d.]+)\)\s+(\d{10}).*?\b(JEE\(Main\)-2024|NEET-2024|MHT-CET|Other)\b", line)
            if match:
                rank = match.group(1)
                percentile = match.group(2)
                choice_code = match.group(3)
                merit_exam = match.group(4)
                results.append({
                    "Rank": rank,
                    "Percentile": percentile,
                    "Choice Code": choice_code,
                    "Merit Exam": merit_exam
                })

# Save to CSV
with open(csv_path, mode="w", newline="") as csv_file:
    writer = csv.DictWriter(csv_file, fieldnames=["Rank", "Percentile", "Choice Code","Merit Exam"])
    writer.writeheader()
    writer.writerows(results)

# Save to JSON
with open(json_path, mode="w") as json_file:
    json.dump(results, json_file, indent=4)

print(f"Saved {len(results)} entries to '{csv_path}' and '{json_path}'")
