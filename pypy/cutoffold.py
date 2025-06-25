import fitz
import re
import pandas as pd
from tqdm import tqdm
import json

pdf_path = '/Users/yuvi/mht cet tech/pypy/cutoff round 1.pdf'

# === Regex
college_re = re.compile(r"^(0\d{4}) - (.+)")
branch_re = re.compile(r"^(0\d{9}) - (.+)")
table_type_re = re.compile(r"^(Home University.*?|Other Than Home University.*?|State Level)$")
percentile_re = re.compile(r"\(([\d.]+)\)")
category_re = re.compile(r"^[A-Z]{3,}[A-Z0-9]*$")

# === Storage
colleges = {}
branches = {}
cutoffs = []
unpaired_cats = []
unpaired_cuts = []

# === State
current_college = None
current_branch_id = None
current_table_type = None
category_queue = []

# === PDF Parse
doc = fitz.open(pdf_path)
print(f"📄 Scanning {len(doc)} pages...\n")

for page in tqdm(doc, desc="Parsing"):
    lines = page.get_text().split("\n")
    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Detect college
        if (match := college_re.match(line)):
            current_college, college_name = match.groups()
            colleges[current_college] = college_name
            if category_queue:
                unpaired_cats.append((current_branch_id, current_table_type, category_queue.copy()))
                category_queue.clear()
            continue

        # Detect branch
        if (match := branch_re.match(line)):
            current_branch_id, branch_name = match.groups()
            branches[current_branch_id] = {
                "college_code": current_branch_id[:5],
                "branch_name": branch_name
            }
            if category_queue:
                unpaired_cats.append((current_branch_id, current_table_type, category_queue.copy()))
                category_queue.clear()
            continue

        # Detect seat type
        if (match := table_type_re.match(line)):
            current_table_type = match.group(1)
            if category_queue:
                unpaired_cats.append((current_branch_id, current_table_type, category_queue.copy()))
                category_queue.clear()
            continue

        # Categories
        tokens = line.split()
        if all(category_re.match(tok) for tok in tokens):
            category_queue.extend(tokens)
            continue

        # Percentiles
        percentiles = percentile_re.findall(line)
        for p in percentiles:
            if category_queue:
                cat = category_queue.pop(0)
                cutoffs.append({
                    "branch_id": current_branch_id,
                    "seat_type": current_table_type,
                    "category_code": cat,
                    "percentile": float(p),
                    "is_tfws": cat.upper() == "TFWS",
                    "is_ews": cat.upper() == "EWS"
                })
            else:
                unpaired_cuts.append((current_branch_id, current_table_type, float(p)))

# === Final unpaired categories flush
if category_queue:
    unpaired_cats.append((current_branch_id, current_table_type, category_queue.copy()))
    category_queue.clear()

# === DataFrames
df_colleges = pd.DataFrame([
    {"college_code": code, "college_name": name}
    for code, name in colleges.items()
])
df_branches = pd.DataFrame([
    {"branch_id": bid, "college_code": data["college_code"], "branch_name": data["branch_name"]}
    for bid, data in branches.items()
])
df_cutoffs = pd.DataFrame(cutoffs)

# === Save CSVs
df_colleges.to_csv("collegesR1.csv", index=False)
df_branches.to_csv("branchesR1.csv", index=False)
df_cutoffs.to_csv("cutoffsR1.csv", index=False)
print(f"\n✅ Extracted {len(df_cutoffs)} cutoffs")

# === Save JSON
merged = df_cutoffs.merge(df_branches, on="branch_id", how="left")
grouped_dict = {}

for branch_id, group in merged.groupby("branch_id"):
    college_code = group["college_code"].iloc[0]
    branch_name = group["branch_name"].iloc[0]
    cutoffs_list = group[["seat_type", "category_code", "percentile", "is_tfws", "is_ews"]].to_dict(orient="records")
    grouped_dict[branch_id] = {
        "college_code": college_code,
        "branch_name": branch_name,
        "cutoffs": cutoffs_list
    }

with open("branchwise_cutoffs_R1.json", "w") as f:
    json.dump(grouped_dict, f, indent=2)

print("📦 Grouped JSON saved.")

# === Mismatch Reports ===
if unpaired_cats:
     print(f"\n⚠️  {len(unpaired_cats)} unpaired category blocks:")
     for b_id, seat, cats in unpaired_cats:
         print(f"   - Branch {b_id} | {seat or 'N/A'}: {cats}")

if unpaired_cuts:
     print(f"\n⚠️  {len(unpaired_cuts)} unpaired cutoffs:")
     for b_id, seat, val in unpaired_cuts:
         print(f"   - Branch {b_id} | {seat or 'N/A'}: ({val})")
