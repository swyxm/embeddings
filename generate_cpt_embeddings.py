import pandas as pd

import os
import time # For rate limiting
from dotenv import load_dotenv
from typing import List
import numpy as np
import google.generativeai as genai


load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable not set. Please set it in your .env file")

GOOGLE_EMBEDDING_MODEL = "models/text-embedding-004"
BATCH_SIZE = 100 #adjust if needed
INPUT_CPT_CSV = "optum_for_my_dhruvywuvy.csv" #set csv path based on what you wanna run embeddings on

genai.configure(api_key=GOOGLE_API_KEY)

def get_embeddings_batch(texts: List[str]) -> List[List[float]]:
    """Generates embeddings for a batch of texts using Google's API with retry logic."""
    max_retries = 5
    for attempt in range(max_retries):
        try:
            response = genai.embed_content(model=GOOGLE_EMBEDDING_MODEL, content=texts, task_type="SEMANTIC_SIMILARITY")
            return response['embedding']
        except Exception as e:
            print(f"Google Generative AI Error: {e}")
            wait_time = 2 ** attempt  # so it doesnt overload again
            print(f"Error during embedding generation. Retrying in {wait_time} seconds...")
            time.sleep(wait_time)
    print(f"Failed to get embeddings after {max_retries} attempts.")
    return [[] for _ in texts]

def generate_embeddings_for_cpt_data():
    """
    Generates and updates embeddings for procedure names in the existing CSV file.
    """
    print("Regenerating procedure_name embeddings...")
    try:
        df = pd.read_csv(INPUT_CPT_CSV)

        if 'procedure_name' not in df.columns:
            raise ValueError("DataFrame must contain a 'procedure_name' column.")

        print(f"Generating new embeddings using {GOOGLE_EMBEDDING_MODEL} for {len(df)} procedure names...")
        
        all_embeddings = []
        for i in range(0, len(df), BATCH_SIZE):
            batch = df['procedure_name'].iloc[i:i+BATCH_SIZE].fillna('').astype(str).tolist()
            print(f"Processing batch {i//BATCH_SIZE + 1} of {(len(df) + BATCH_SIZE - 1)//BATCH_SIZE}...")
            
            batch_embeddings = get_embeddings_batch(batch)
            all_embeddings.extend(batch_embeddings)
            
            time.sleep(0.1)

        df['embedding'] = all_embeddings
        initial_count = len(df)
        df = df[df['embedding'].apply(len) > 0]
        
        if len(df) < initial_count:
            print(f"Warning: {initial_count - len(df)} entries failed embedding generation and were removed.")

        df.to_csv(INPUT_CPT_CSV, index=False)
        print(f"Embeddings successfully updated in {INPUT_CPT_CSV}")
        print(f"Total entries with embeddings: {len(df)}")

    except Exception as e:
        print(f"An error occurred during embedding generation: {e}")
        raise

if __name__ == "__main__":
    generate_embeddings_for_cpt_data() 