import os
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer

def load_documents(folder_path):
    """Loads all text documents from the given folder path."""
    documents = []
    for filename in os.listdir(folder_path):
        if filename.endswith('.txt'):
            filepath = os.path.join(folder_path, filename)
            with open(filepath, 'r') as f:
                document = f.read()
                documents.append(document)
    return documents

def compute_cosine_similarity(documents):
    """Computes the cosine similarity matrix between the given set of documents."""
    vectorizer = CountVectorizer().fit_transform(documents)
    vectors = vectorizer.toarray()
    similarity_matrix = np.zeros((len(vectors), len(vectors)))
    for i in range(len(vectors)):
        for j in range(i+1, len(vectors)):
            similarity = cosine_similarity(vectors[i], vectors[j])
            similarity_matrix[i][j] = similarity
            similarity_matrix[j][i] = similarity
    return similarity_matrix

# Example usage
folder_path = '/path/to/your/folder'
documents = load_documents(folder_path)
similarity_matrix = compute_cosine_similarity(documents)
# print(similarity_matrix)