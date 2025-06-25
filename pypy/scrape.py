import pandas as pd
import requests
from bs4 import BeautifulSoup
import time

# Load your CSV
df = pd.read_csv('/Users/yuvi/mht cet tech/pypy/colleges.csv')

# Function to scrape info for one college
def get_college_info(code):
    url = f"https://fe2025.mahacet.org/StaticPages/frmInstituteSummary?InstituteCode={str(code).zfill(5)}"
    
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        def get_text(span_id):
            tag = soup.find('span', id=span_id)
            return tag.text.strip() if tag else ''

        return {
            'college_code': str(code).zfill(5),
            'Institute Name': get_text('rightContainer_ContentBox1_lblInstituteName'),
            'Institute Address': get_text('rightContainer_ContentBox1_lblInstituteAddress'),
            'Region': get_text('rightContainer_ContentBox1_lblRegion'),
            'District': get_text('rightContainer_ContentBox1_lblDistrict'),
            'Status': get_text('rightContainer_ContentBox1_lblStatus1'),
            'Autonomy Status': get_text('rightContainer_ContentBox1_lblStatus2'),
            'Minority Status': get_text('rightContainer_ContentBox1_lblStatus3'),
        }

    except Exception as e:
        print(f"Error for {code}: {e}")
        return {
            'college_code': str(code).zfill(5),
            'Institute Name': '',
            'Institute Address': '',
            'Region': '',
            'District': '',
            'Status': '',
            'Autonomy Status': '',
            'Minority Status': '',
        }

# Loop through all codes
results = []
for idx, row in df.iterrows():
    code = row['college_code']
    info = get_college_info(code)
    results.append(info)
    print(f"Fetched {code}")
    time.sleep(1)  # Sleep to avoid hammering the site

# Save to CSV
output_df = pd.DataFrame(results)
output_df.to_csv('college_details_scraped_new.csv', index=False)
print("Saved to college_details_scraped.csv")

print(f"✅ All college data fetched and saved.")
print(f"Total entries fetched: {len(results)}")

