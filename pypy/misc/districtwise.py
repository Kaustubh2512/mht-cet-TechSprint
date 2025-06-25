import pandas as pd
import re

# Show all rows and all columns in the terminal
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)
pd.set_option('display.max_colwidth', None)

# Load your CSV
df = pd.read_csv('/Users/yuvi/mht cet tech/pypy/colleges.csv')

# List of Maharashtra districts
districts = [
    'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana',
    'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna',
    'Kolhapur', 'Latur', 'Mumbai', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik',
    'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli',
    'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'
]

# Function to detect district
def extract_district(name):
    for district in districts:
        if re.search(r'\b' + re.escape(district) + r'\b', name, re.IGNORECASE):
            return district
    return 'Other'

# Assign districts
df['district'] = df['college_name'].apply(extract_district)

# Sort by district
df_sorted = df.sort_values(by='district').reset_index(drop=True)

# Print entire DataFrame
print(df_sorted)

df_sorted.to_csv('sorted_colleges_by_district.csv', index=False)

