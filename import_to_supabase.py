import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()

# Database connection details
DB_URL = os.getenv('SUPABASE_DB_URL')  # You'll need to add this to your .env file
if not DB_URL:
    raise ValueError("SUPABASE_DB_URL environment variable not set in .env file")

# Create database connection
engine = create_engine(DB_URL)

def import_large_csv():
    print("Starting CSV import to Supabase...")
    start_time = time.time()
    
    # Read and upload in chunks
    chunk_size = 10000
    total_rows = 0
    
    try:
        for chunk_num, chunk in enumerate(pd.read_csv('aetna_rows.csv', chunksize=chunk_size), 1):
            print(f"Processing chunk {chunk_num}...")
            chunk.to_sql('aetna_rows', engine, if_exists='append', index=False)
            total_rows += len(chunk)
            print(f"Imported {total_rows} rows so far...")
            
    except Exception as e:
        print(f"Error during import: {e}")
        return
    
    end_time = time.time()
    print(f"\nImport completed!")
    print(f"Total rows imported: {total_rows}")
    print(f"Time taken: {end_time - start_time:.2f} seconds")

if __name__ == "__main__":
    import_large_csv() 