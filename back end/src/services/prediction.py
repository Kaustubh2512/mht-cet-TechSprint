import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
import pickle
import json
import sys
import os
import traceback

def load_models():
    try:
        # Get the absolute path to the models directory
        current_dir = os.path.dirname(os.path.abspath(__file__))
        models_dir = os.path.join(os.path.dirname(os.path.dirname(current_dir)), 'src', 'models')
        
        # Load the trained model, scaler, and label encoder with correct filenames
        model_path = os.path.join(models_dir, 'college_prediction_model_compressed.pkl')
        scaler_path = os.path.join(models_dir, 'scaler (2).pkl')
        label_encoder_path = os.path.join(models_dir, 'label_encoders (1).pkl')
        
        print(f"Loading models from: {models_dir}")
        print(f"Model path: {model_path}")
        print(f"Scaler path: {scaler_path}")
        print(f"Label encoder path: {label_encoder_path}")
        
        # Check if model files exist
        if not os.path.exists(model_path):
            print(f"Model file not found: {model_path}")
        if not os.path.exists(scaler_path):
            print(f"Scaler file not found: {scaler_path}")
        if not os.path.exists(label_encoder_path):
            print(f"Label encoder file not found: {label_encoder_path}")
            
        if not os.path.exists(model_path) or not os.path.exists(scaler_path) or not os.path.exists(label_encoder_path):
            print("Model files not found. Using mock model for testing.")
            # Create mock model for testing
            model = RandomForestClassifier()
            model.fit(np.array([[0, 0, 0, 0, 0, 0]]), np.array([0]))
            
            scaler = StandardScaler()
            scaler.fit(np.array([[0, 0, 0, 0, 0, 0]]))
            
            label_encoder = LabelEncoder()
            label_encoder.fit(['Computer Science', 'Open', 'CAP', 'I', 'OPEN', '90.0'])
            
            return model, scaler, label_encoder
        
        print("Loading model files...")
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        print("Model loaded successfully")
        
        with open(scaler_path, 'rb') as f:
            scaler = pickle.load(f)
        print("Scaler loaded successfully")
        
        with open(label_encoder_path, 'rb') as f:
            label_encoder = pickle.load(f)
        print("Label encoder loaded successfully")
        
        return model, scaler, label_encoder
    except Exception as e:
        print(f"Error loading models: {str(e)}")
        print(traceback.format_exc())
        sys.exit(1)

def preprocess_input(data, label_encoder):
    try:
        print(f"Preprocessing input data: {data}")
        
        # Convert MHT CET score to percentile (if not already provided)
        percentile = data.get('percentile', data.get('mht_cet_score', 0))
        
        # Map input data to model's expected format
        model_input = {
            'Branch': data.get('preferred_branch', 'Computer Science'),
            'Status': 'Open',  # Default value
            'Admission Level': 'State Level',  # Fixed value as per requirement
            'Stage': 'I',  # Default value as per requirement
            'Caste Category': data.get('category', 'OPEN'),
            'Percentile': str(percentile)
        }
        
        print(f"Mapped input data: {model_input}")
        
        # Convert categorical variables using label encoder
        features = np.array([
            model_input['Branch'],
            model_input['Status'],
            model_input['Admission Level'],
            model_input['Stage'],
            model_input['Caste Category'],
            float(model_input['Percentile'])
        ]).reshape(1, -1)
        
        print(f"Preprocessed features: {features}")
        return features
    except Exception as e:
        print(f"Error preprocessing input: {str(e)}")
        print(traceback.format_exc())
        sys.exit(1)

def predict_college(input_data):
    try:
        print(f"Starting prediction for input: {input_data}")
        # Load models
        model, scaler, label_encoder = load_models()
        
        # Preprocess input
        features = preprocess_input(input_data, label_encoder)
        
        # Scale features
        print("Scaling features...")
        scaled_features = scaler.transform(features)
        print(f"Scaled features: {scaled_features}")
        
        # Make prediction
        print("Making prediction...")
        prediction = model.predict_proba(scaled_features)[0]
        print(f"Raw prediction: {prediction}")
        
        # Get top 5 colleges with their probabilities
        top_colleges = []
        for i, prob in enumerate(prediction):
            if prob > 0.1:  # Only include colleges with >10% probability
                college_name = label_encoder.inverse_transform([i])[0]
                top_colleges.append({
                    'college_name': college_name,
                    'probability': float(prob)
                })
        
        # Sort by probability
        top_colleges.sort(key=lambda x: x['probability'], reverse=True)
        print(f"Top colleges: {top_colleges}")
        
        return json.dumps({
            'status': 'success',
            'predictions': top_colleges[:5]
        })
    except Exception as e:
        print(f"Error in predict_college: {str(e)}")
        print(traceback.format_exc())
        return json.dumps({
            'status': 'error',
            'message': str(e)
        })

if __name__ == "__main__":
    # Read input from stdin
    input_data = json.loads(sys.stdin.read())
    
    # Make prediction
    result = predict_college(input_data)
    
    # Print result to stdout
    print(result) 