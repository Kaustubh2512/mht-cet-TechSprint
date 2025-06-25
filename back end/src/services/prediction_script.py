import sys
import json
import pickle
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder

def load_models():
    """Load the trained model, scaler, and label encoder"""
    model_path = 'src/models/model.pkl'
    scaler_path = 'src/models/scaler.pkl'
    encoder_path = 'src/models/encoder.pkl'
    
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    with open(scaler_path, 'rb') as f:
        scaler = pickle.load(f)
    with open(encoder_path, 'rb') as f:
        encoder = pickle.load(f)
    
    return model, scaler, encoder

def preprocess_input(input_data, encoder):
    """Preprocess the input data for prediction"""
    # Create a DataFrame with the input data
    df = pd.DataFrame([input_data])
    
    # Encode categorical variables
    df['category'] = encoder.transform(df['category'])
    df['preferredBranch'] = encoder.transform(df['preferredBranch'])
    
    # Scale numerical features
    numerical_features = ['jeeMainRank', 'mhtCETScore']
    df[numerical_features] = scaler.transform(df[numerical_features])
    
    return df

def predict_colleges(input_data):
    """Make predictions using the loaded model"""
    try:
        # Load models
        model, scaler, encoder = load_models()
        
        # Preprocess input
        processed_data = preprocess_input(input_data, encoder)
        
        # Make prediction
        probabilities = model.predict_proba(processed_data)[0]
        
        # Get top 5 predictions
        top_5_indices = np.argsort(probabilities)[-5:][::-1]
        
        # Format predictions
        predictions = []
        for idx in top_5_indices:
            prediction = {
                'collegeName': f'College {idx + 1}',  # Replace with actual college names
                'branch': input_data['preferredBranch'],
                'location': input_data.get('preferredLocation', 'Any'),
                'collegeType': input_data.get('preferredCollegeType', 'Any'),
                'probability': float(probabilities[idx])
            }
            predictions.append(prediction)
        
        return predictions
    
    except Exception as e:
        print(f"Error in prediction: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    # Get input data from command line argument
    input_json = sys.argv[1]
    input_data = json.loads(input_json)
    
    # Make predictions
    predictions = predict_colleges(input_data)
    
    # Output predictions as JSON
    print(json.dumps(predictions)) 