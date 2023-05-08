import pymongo
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def load_data(database_name, collection_name):
    """Loads the product data from a MongoDB collection."""
    client = pymongo.MongoClient()
    db = client[database_name]
    collection = db[collection_name]
    data = pd.DataFrame(list(collection.find()))
    return data

def preprocess_data(data):
    """Preprocesses the product data by cleaning and tokenizing the descriptions."""
    data['description'] = data['description'].str.lower()
    data['description'] = data['description'].str.replace('[^a-zA-Z0-9\s]', '')  # remove punctuation
    data['tokens'] = data['description'].str.split()
    return data

def vectorize_data(data):
    """Vectorizes the product descriptions using the bag-of-words model."""
    vectorizer = CountVectorizer(stop_words='english')
    vectorizer.fit(data['description'])
    vectors = vectorizer.transform(data['description'])
    return vectors

def recommend_similar_products(product_id, vectors, data, num_recommendations=5):
    """Recommends similar products based on their descriptions using cosine similarity."""
    target_index = data[data['id'] == product_id].index[0]
    target_vector = vectors[target_index].toarray()[0]
    similarity_scores = cosine_similarity(target_vector.reshape(1, -1), vectors)
    similarity_scores_sorted = np.argsort(similarity_scores)[0][::-1]
    recommended_indices = similarity_scores_sorted[1:num_recommendations+1]  # exclude the target product
    recommended_products = data.loc[recommended_indices][['id', 'name', 'description']]
    return recommended_products

# Example usage
database_name = 'my_database'
collection_name = 'products'
product_id = 12345  # example product ID
num_recommendations = 2
client = pymongo.MongoClient()
db = client[database_name]
collection = db[collection_name]
data = load_data(database_name, collection_name)
data = preprocess_data(data)
vectors = vectorize_data(data)
recommended_products = recommend_similar_products(product_id, vectors, data, num_recommendations)
# print(f'Recommended products for ID {product_id}:')
# print(recommended_products)