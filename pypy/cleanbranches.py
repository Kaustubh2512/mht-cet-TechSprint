import pandas as pd

def clean_branch_data(input_file, output_file):
    # Read CSV with branch_id as string to preserve leading zeros
    df = pd.read_csv(input_file, dtype={'branch_id': str})
    
    # Extract last 5 characters
    df['branch_id'] = df['branch_id'].str[-5:]
    
    # Validate length (add error reporting)
    invalid_ids = df[df['branch_id'].str.len() != 5]
    if not invalid_ids.empty:
        print(f"Warning: Found {len(invalid_ids)} invalid IDs (not 5 characters):")
        print(invalid_ids)
    
    # Remove college_code column and drop duplicates
    df = df.drop(columns=['college_code']).drop_duplicates()
    
    # Save cleaned data
    df.to_csv(output_file, index=False)
    print(f"Cleaned data saved to {output_file}")
    print(f"Removed {len(invalid_ids)} invalid rows and {len(df)} valid rows remain")

# Usage
clean_branch_data('/Users/yuvi/mht cet tech/pypy/branches.csv', 'cleaned_branches.csv')