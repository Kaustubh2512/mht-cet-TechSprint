import pandas as pd

# Load CSV with branch_id as string
df = pd.read_csv('/Users/yuvi/mht cet tech/pypy/branchesR1.csv', dtype={"branch_id": str})



# Remove the first 5 digits (college code)
df["branch_id"] = df["branch_id"].str[5:]
print(df['branch_id'])
# Drop the college_code column
df.drop(columns=["college_code"], inplace=True)

# Drop duplicates based on branch_id and branch_name
df = df.drop_duplicates(subset=["branch_id", "branch_name"])

# Save the cleaned dataframe to CSV
df.to_csv("cleaned_branchesR1.csv", index=False)

print("✅ Cleaned branches saved as 'cleaned_branches.csv'")