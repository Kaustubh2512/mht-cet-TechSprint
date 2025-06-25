import pandas as pd
import requests
from bs4 import BeautifulSoup
import time

# Load your college list
df = pd.read_csv('/Users/yuvi/projects/Result/test env/collegesR1.csv')

def get_university_name(code):
    url = f"https://fe2025.mahacet.org/StaticPages/frmInstituteSummary?InstituteCode={str(code).zfill(5)}"
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find the course-university table
        table = soup.find('table', id='rightContainer_ContentBox7_gvChoiceCodeList')
        if not table:
            return ''

        rows = table.find_all('tr')
        for row in rows[1:]:  # skip header row
            cols = row.find_all('td')
            if len(cols) >= 3:
                return cols[2].text.strip()  # 3rd column is University
        return ''
    except Exception as e:
        print(f"Error fetching university for {code}: {e}")
        return ''

# Add university to each row
universities = []
for idx, row in df.iterrows():
    code = row['college_code']
    uni = get_university_name(code)
    universities.append(uni)
    print(f"Fetched university for {code}: {uni}")
    time.sleep(1)  # Be polite

df['University'] = universities

# Save the enriched data
df.to_csv('colleges_with_university.csv', index=False)
print("\n✅ All university data fetched and saved to 'colleges_with_university.csv'")
