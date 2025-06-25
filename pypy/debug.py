import pdfplumber
import pandas as pd
import re
import json
from tqdm import tqdm
from collections import defaultdict

pdf_path = '/Users/yuvi/mht cet tech/pypy/cutoff round 1.pdf'
cutoffs = []

college_re = re.compile(r"^(0\d{4}) - (.+)")
branch_re = re.compile(r"^(0\d{9}) - (.+)")
table_type_re = re.compile(r"^(Home University.*?|Other Than Home University.*?|State Level)$")
category_re = re.compile(r"^[A-Z]{3,}[A-Z0-9]*$")
cutoff_value_re = re.compile(r"\((\d+\.\d+)\)")

def group_words_by_line(words, y_tolerance=2):
    lines = defaultdict(list)
    for word in words:
        y = word['top']
        found = False
        for key in lines:
            if abs(key - y) < y_tolerance:
                lines[key].append(word)
                found = True
                break
        if not found:
            lines[y].append(word)
    result = []
    for y in sorted(lines):
        line_words = sorted(lines[y], key=lambda w: w['x0'])
        line_text = ' '.join(w['text'] for w in line_words)
        result.append((y, line_text))
    return result

def get_heading_above(table_y0, heading_by_y):
    above = [y for y in heading_by_y if y < table_y0]
    if not above:
        return {"college": ("", ""), "branch": ("", ""), "seat_type": ""}
    nearest_y = max(above)
    return heading_by_y[nearest_y]

with pdfplumber.open(pdf_path) as pdf:
    for page in tqdm(pdf.pages, desc="Parsing pages"):
        print(f"\n📄 Page {page.page_number}")
        page_cutoffs = 0
        words = page.extract_words()
        tables = page.find_tables()
        
        # Build heading map from lines
        lines_with_y = group_words_by_line(words)
        heading_by_y = {}
        current_college = ("", "")
        current_branch = ("", "")
        current_seat_type = ""
        for y, line in lines_with_y:
            if (m := college_re.match(line)):
                current_college = m.groups()
            elif (m := branch_re.match(line)):
                current_branch = m.groups()
            elif (m := table_type_re.match(line)):
                current_seat_type = m.group()
            heading_by_y[y] = {
                "college": current_college,
                "branch": current_branch,
                "seat_type": current_seat_type
            }
        # For each table, find the nearest heading above
        for table in tables:
            
            
            table_y0 = table.bbox[1]
            heading = get_heading_above(table_y0, heading_by_y)
            current_college_code, current_college_name = heading["college"]
            current_branch_id, current_branch_name = heading["branch"]
            current_seat_type = heading["seat_type"]
            rows = [[cell.strip() if cell else "" for cell in row] for row in table.extract()]
            
            

            
            if len(rows) < 2:
                continue
            category_row = None
            
            for row in rows:
                
                if all(category_re.fullmatch(cell.replace('\n', '')) or cell == "" for cell in row):
                    category_row = row
                    
                    
                    
                elif any(cutoff_value_re.search(cell) for cell in row) and category_row:
                    for cat, val in zip(category_row, row):
                        if not cat:
                            continue
                        match = cutoff_value_re.search(val)
                        if match:
                            cutoffs.append({
                                "college_code": current_college_code,
                                "college_name": current_college_name,
                                "branch_id": current_branch_id,
                                "branch_name": current_branch_name,
                                "seat_type": current_seat_type,
                                "category_code": cat,
                                "percentile": float(match.group(1)),
                                "is_tfws": cat.upper() == "TFWS",
                                "is_ews": cat.upper() == "EWS"
                            })
                            page_cutoffs += 1
        print(f"✅ Extracted {page_cutoffs} cutoffs on page {page.page_number}")

# Save CSV
if cutoffs:
    print(f"\n📊 Total cutoffs extracted: {len(cutoffs)}")
    df = pd.DataFrame(cutoffs)
    df = df[["college_code", "college_name", "branch_id", "branch_name", "seat_type", "category_code", "percentile", "is_tfws", "is_ews"]]
    df.to_csv("final_cutoffs_with_branchesR1_debug.csv", index=False)
    print("\n📁 Saved as final_cutoffs_with_branchesR1.csv")
    # Save grouped JSON
    grouped = {}
    for branch_id, group in df.groupby("branch_id"):
        grouped[branch_id] = {
            "college_code": group["college_code"].iloc[0],
            "college_name": group["college_name"].iloc[0],
            "branch_name": group["branch_name"].iloc[0],
            "cutoffs": group[["seat_type", "category_code", "percentile", "is_tfws", "is_ews"]].to_dict(orient="records")
        }
    with open("branchwise_cutoffsR1_debug.json", "w") as f:
        json.dump(grouped, f, indent=2)
    print("📦 Saved grouped JSON as branchwise_cutoffs.json")
    print(f"\n📊 Total cutoffs extracted: {len(cutoffs)}")

else:
    print("⚠️ No cutoff data extracted. Check table format or PDF structure.")



