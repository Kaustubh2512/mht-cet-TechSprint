import pandas as pd

# Your CSV content as a multiline string
csv_data = """group_name,branch_ids
Civil Engineering,19110;90610;91810;91510;92210;46310
CS special,26710;91110;91210;25710;92010;91010;56810;26010;91310;26210;92510;92710;25310;26510;25210;92410
Information Technology,24610
Electrical Engineering,29310;35610;29710;57310
Electronics and Telecommunication Engineering,37210;37810;92810;37610;93310;93510;37010;92910;93210
Instrumentation/production Engineering,60610;62610;46610;46410
Mechanical/Auto/mechatronix Engineering,61210;61510;90810;25910;61610;62510;60210
Food Technology,50310;90710;53410;50410
Artificial Intelligence and Data Science/Machine learning,26310;99510;92110;99710;91710;26610
Chemical Engineering,52710;50710;81610;90410;51110;51810;51710;52310;51910;50110
Computer Engineering,24510;24210;56610;90510;25410;25110
Textile Engineering,89310;89610;51410;46510;88610;89010
Automation and Robotics,91610;21910;62410
Bio Medical Engineering,46110;08210;51310
Other,01110;57010;84110;52410;91410;93610;50810;70110;00210
Electrical/Electronics +CS,90010;92610;84410"""

# Convert to a DataFrame
from io import StringIO
df = pd.read_csv(StringIO(csv_data))

# Function to pad branch IDs to 5 digits
def pad_ids(id_str):
    return ';'.join(f"{int(id_):05d}" for id_ in id_str.split(';'))

# Apply padding function
df['branch_ids'] = df['branch_ids'].apply(pad_ids)

# Save to CSV
df.to_csv("standardized_branch_ids.csv", index=False)
print("✅ CSV saved as 'standardized_branch_ids.csv'")
