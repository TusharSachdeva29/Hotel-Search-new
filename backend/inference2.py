import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from transformers import AutoTokenizer, AutoModel
import torch
import spacy

# 1️⃣ Load the hotel data and embeddings
hotel_data = pd.read_csv("dataset/hotel_data2.csv")
embeddings = np.load("dataset/hotel_embeddings2.npy")

# 2️⃣ Load the pre-trained model and tokenizer for generating user query embeddings
model_name = "roberta-base"  # or 'microsoft/deberta-v3-base'
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

# Check if GPU is available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

# 3️⃣ Load spaCy's pre-trained NER model
nlp = spacy.load("en_core_web_trf")

# 4️⃣ Function to extract location from user query using spaCy
def extract_location(text):
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "GPE":  # GPE = Geopolitical Entity (countries, cities, states)
            return ent.text
    return None

# 5️⃣ Function to generate embeddings for the user query
def get_embedding(text):
    tokens = tokenizer(text, padding=True, truncation=True, return_tensors="pt").to(device)
    with torch.no_grad():
        output = model(**tokens)
    embedding = output.last_hidden_state[:, 0, :].cpu().numpy()
    return embedding.squeeze()

# 6️⃣ Function to recommend hotels based on user query
def recommend_hotels(user_query, top_n=20):
    # Extract location from the user query
    location = extract_location(user_query)
    if location:
        # Filter hotels based on location
        filtered_data = hotel_data[hotel_data['cityName'].str.contains(location, case=False, na=False)]
        if filtered_data.empty:
            print(f"No hotels found for location: {location}")
            return None
    else:
        print("No location found in the query. Showing results from all locations.")
        filtered_data = hotel_data

    # Generate embedding for the user query
    user_embedding = get_embedding(user_query).reshape(1, -1)

    # Calculate cosine similarity between user query and hotel embeddings
    similarities = cosine_similarity(user_embedding, embeddings[filtered_data.index])[0]

    # Get the top N most similar hotels
    top_indices = similarities.argsort()[-top_n:][::-1]

    # Return the top N hotels with their details and similarity scores
    recommendations = filtered_data.iloc[top_indices].copy()
    recommendations['similarity_score'] = similarities[top_indices]
    return recommendations.to_json()

# 7️⃣ Example Usage
if __name__ == "__main__":
    user_query = "looking for hotel with swimming pool"
    recommended_hotels = recommend_hotels(user_query)

    # Display the recommendations
    if recommended_hotels is not None:
        print(recommended_hotels[['HotelName', 'cityName', 'similarity_score']])
