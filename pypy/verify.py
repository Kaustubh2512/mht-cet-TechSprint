import pandas as pd

# Load both CSVs
df_old = pd.read_csv('/Users/yuvi/mht cet tech/pypy/college_details_scraped.csv')
df_new = pd.read_csv('/Users/yuvi/mht cet tech/pypy/college_details_scraped_new.csv')

# Sort by college_code to ensure rows align
df_old_sorted = df_old.sort_values('college_code').reset_index(drop=True)
df_new_sorted = df_new.sort_values('college_code').reset_index(drop=True)

# Show shape mismatch if any
if df_old_sorted.shape != df_new_sorted.shape:
    print(f"⚠️ Files have different shapes: {df_old_sorted.shape} vs {df_new_sorted.shape}")

# ------------------------------------
# 1. Compare matching entries (row & column-wise)
# ------------------------------------
differences = df_old_sorted.compare(df_new_sorted, keep_equal=False)

if differences.empty:
    print("✅ All entries match exactly between the two files.")
else:
    print(f"❌ Found {len(differences)} differing entries:\n")
    print(differences)

    # Save differences to CSV
    differences.to_csv("college_differences.csv")
    print("\n💾 Differences saved to 'college_differences.csv'")

# ------------------------------------
# 2. Detect entries present in one file but missing in the other
# ------------------------------------
# Colleges in new file but not in old
new_only = df_new[~df_new['college_code'].isin(df_old['college_code'])]

# Colleges in old file but not in new
old_only = df_old[~df_old['college_code'].isin(df_new['college_code'])]

if not new_only.empty:
    print("\n🆕 New colleges not present in old file:")
    print(new_only)
    new_only.to_csv("new_colleges.csv", index=False)

if not old_only.empty:
    print("\n🗑️ Colleges missing in new file:")
    print(old_only)
    old_only.to_csv("missing_colleges.csv", index=False)

# Final summary
print("\n✅ Comparison complete.")
