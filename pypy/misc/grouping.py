import csv
from collections import defaultdict

# Define your grouping keywords and master group names here
grouping = {
    "civil": "Civil Engineering",
    "structural": "Civil Engineering",
    "infrastructure": "Civil Engineering",
    "computer science": "Computer Science and Engineering",
    "ai": "Artificial Intelligence and Data Science",
    "artificial intelligence": "Artificial Intelligence and Data Science",
    "data science": "Artificial Intelligence and Data Science",
    "electrical": "Electrical Engineering",
    "electronics": "Electronics and Telecommunication Engineering",
    "mechanical": "Mechanical Engineering",
    "textile": "Textile Engineering",
    "chemical": "Chemical Engineering",
    "food": "Food Technology",
    "pharmaceutical": "Pharmaceutical Technology",
    "production": "Production Engineering",
    "automation": "Automation and Robotics",
    "computer engineering": "Computer Engineering",
    "information technology": "Information Technology",
    "cyber security": "Cyber Security",
    "iot": "Internet of Things (IoT)",
    "biomedical": "Biomedical Engineering",
    "robotics": "Robotics and Automation",
    "fashion": "Fashion Technology",
    "printing": "Printing Technology",
    "mining": "Mining Engineering",
    # Add any other keywords you want to group here...
}

def map_to_group(branch_name):
    branch_name_lower = branch_name.lower()
    for keyword, group_name in grouping.items():
        if keyword in branch_name_lower:
            return group_name
    return branch_name  # fallback: no grouping found, keep original name

grouped_branches = defaultdict(list)

with open('/Users/yuvi/mht cet tech/pypy/cleaned_branches.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        group = map_to_group(row['branch_name'])
        grouped_branches[group].append(row['branch_id'])

# Save grouped data to a new CSV file
with open('grouped_branches.csv', 'w', newline='') as outfile:
    writer = csv.writer(outfile)
    # Write header
    writer.writerow(['group_name', 'branch_ids', 'count'])

    for group_name, ids in grouped_branches.items():
        writer.writerow([group_name, ";".join(ids), len(ids)])

print("Grouped branches saved to grouped_branches.csv")
