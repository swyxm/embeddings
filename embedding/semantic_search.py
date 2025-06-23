import pandas as pd
import numpy as np
from typing import List, Tuple
import openai
from dotenv import load_dotenv
import os
import faiss
import pickle
from tqdm import tqdm
import google.generativeai as genai

load_dotenv()


genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-2.5-flash-preview-05-20')

SIMILARITY_THRESHOLD = 0.02 

def get_embedding(text: str) -> List[float]:
    """Generate embedding for a single text using Google's Generative AI API."""
    try:
        if not text or not text.strip():
            print("Warning: Empty or invalid text provided for embedding")
            return None
            
        print(f"Generating embedding for text of length: {len(text)}")
        response = genai.embed_content(
            model="models/text-embedding-004",
            content=text,
            task_type="SEMANTIC_SIMILARITY"
        )
        
        if not response or 'embedding' not in response:
            print(f"Unexpected response format from API: {response}")
            return None
            
        embedding = response['embedding']
        print(f"Generated embedding of length: {len(embedding) if embedding is not None else 0}")
        return embedding
        
    except Exception as e:
        print(f"Error generating embedding: {str(e)}")
        import traceback
        print("Traceback:", traceback.format_exc())
        return None

def create_faiss_index(df: pd.DataFrame, index_file: str = "embeddings.index", descriptions_file: str = "descriptions.pkl"):
    """
    Create a FAISS index from the embeddings in the DataFrame.
    This only needs to be done once, and then the index can be reused.
    """
    print("Creating FAISS index...")
    
    # Convert embeddings to numpy array
    embeddings = []
    for embedding in tqdm(df['embedding']):
        if isinstance(embedding, str):
            embedding = eval(embedding)
        embeddings.append(embedding)
    
    embeddings = np.array(embeddings).astype('float32')
    
    # Normalize the embeddings for cosine similarity
    faiss.normalize_L2(embeddings)
    
    # Create FAISS index for cosine similarity
    dimension = len(embeddings[0])  # dimension of the embeddings
    index = faiss.IndexFlatIP(dimension)  # Inner product index for cosine similarity
    index.add(embeddings)
    
    faiss.write_index(index, index_file)
    with open(descriptions_file, 'wb') as f:
        pickle.dump(df['procedure_name'].tolist(), f)
    
    print("Index created and saved!")
    return index, df['procedure_name'].tolist()

def load_faiss_index(index_file: str = "embeddings.index", descriptions_file: str = "descriptions.pkl"):
    """Load the FAISS index and descriptions."""
    if not os.path.exists(index_file) or not os.path.exists(descriptions_file):
        return None, None
    
    index = faiss.read_index(index_file)
    with open(descriptions_file, 'rb') as f:
        descriptions = pickle.load(f)
    
    return index, descriptions

def compare_with_llm(query: str, candidates: List[Tuple[str, float]]) -> List[Tuple[str, float]]:
    """
    Use Gemini 2.5 Flash to compare candidates when their similarity scores are close.
    """
    prompt = f"""You are a medical coding expert. Your task is to match medical procedures with their most accurate descriptions.

Given this search query:
"{query}"

Which of these procedures best matches the query? Consider:
- The main procedure (tracheostomy/laryngectomy)
- Whether complications or comorbidities (CC/MCC) are mentioned
- The specific conditions (facial, oral, neck)
- The presence of any additional procedures

Candidates:
{chr(10).join(f'{i+1}. {cand[0]}' for i, cand in enumerate(candidates))}

Think carefully about the medical meaning and return only the number of the best matching candidate (1-{len(candidates)}).
"""

    response = model.generate_content(prompt)
    
    try:
        chosen_num = int(response.text.strip()) - 1
        #reoder w geminei
        reordered = [candidates[chosen_num]] + [c for i, c in enumerate(candidates) if i != chosen_num]
        return reordered
    except:
        return candidates  

def search_similar_procedures(query: str, index, descriptions, top_k: int = 5) -> List[Tuple[str, float]]:
    """
    Search for procedures similar to the query using FAISS.
    
    Args:
        query: The search query
        index: FAISS index
        descriptions: List of procedure descriptions
        top_k: Number of results to return
    
    Returns:
        List of tuples containing (procedure_name, similarity_score)
    """
    try:
        print("Getting query embedding...")
        embedding = get_embedding(query)
        print(f"Got embedding of length: {len(embedding) if embedding is not None else 'None'}")
        
        if not embedding:
            raise ValueError("Failed to generate embedding for the query")
            
        query_embedding = np.array([embedding]).astype('float32')
        print("Normalizing embedding...")
        
        faiss.normalize_L2(query_embedding)
        print("Searching index...")
        
        similarities, indices = index.search(query_embedding, top_k)
        print(f"Search complete. Found {len(indices[0])} results")
        
        # not inverting anymore but dont wanna change var names lol
        inverted_similarities = similarities[0]
        
        results = []
        for i, (idx, sim) in enumerate(zip(indices[0], inverted_similarities)):
            try:
                if idx < len(descriptions):  # Ensure index is within bounds
                    results.append((descriptions[idx], float(sim)))
                else:
                    print(f"Warning: Index {idx} out of bounds for descriptions (len={len(descriptions)})")
            except Exception as e:
                print(f"Error processing result {i}: {e}")
        
        if len(results) > 1:
            top_score = results[0][1]
            close_candidates = []
            
            for result in results:
                if abs(result[1] - top_score) <= SIMILARITY_THRESHOLD:
                    close_candidates.append(result)
                else:
                    break
            
            # If we have close candidates, use Gemini to compare them
            if len(close_candidates) > 1:
                print(f"\nFound {len(close_candidates)} very similar candidates. Using Gemini to determine best match...")
                try:
                    reordered_candidates = compare_with_llm(query, close_candidates)
                    # Replace the close candidates with Gemini-ordered ones
                    results = reordered_candidates + results[len(close_candidates):]
                except Exception as e:
                    print(f"Error in Gemini comparison: {e}")
        
        return results
        
    except Exception as e:
        import traceback
        print(f"Error in search_similar_procedures: {str(e)}")
        print("Traceback:", traceback.format_exc())
        return []

def main():
    #update csv here
    csv_file = "optum_for_my_dhruvywuvy.csv"
    
    base_name = os.path.splitext(csv_file)[0]
    index_file = f"{base_name}.index"
    descriptions_file = f"{base_name}_descriptions.pkl"
    
    try:
        df = pd.read_csv(csv_file)
        print(f"Loaded {len(df)} procedures from {csv_file}")
        
        # Check if index files exist
        if os.path.exists(index_file) and os.path.exists(descriptions_file):
            print(f"Loading existing index from {index_file}...")
            index, descriptions = load_faiss_index(index_file, descriptions_file)
        else:
            print(f"No existing index found. Creating new FAISS index with Google embeddings...")
            index, descriptions = create_faiss_index(df, index_file, descriptions_file)
        
        while True:
            query = input("\enter procedure (q to exit): ")
            if query.lower() == 'quit' or query.lower() == 'q':
                break
            
            print("\loading...")
            results = search_similar_procedures(query, index, descriptions)
            
            print("\nresults:")
            for i, (procedure, score) in enumerate(results, 1):
                print(f"\n{i}. Similarity: {score:.4f}")
                print(f"Procedure: {procedure}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main() 