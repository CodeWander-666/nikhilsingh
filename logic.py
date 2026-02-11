from flask import Flask, jsonify
from flask_cors import CORS
import random
import time
import math

app = Flask(__name__)
CORS(app)  # Allow frontend to access this

@app.route('/api/visual-effects', methods=['GET'])
def get_visual_effects():
    # Simulate AI analyzing "System Mood" to generate visual parameters
    timestamp = time.time()
    
    # Calculate a "breathing" distortion value based on time
    base_distortion = (math.sin(timestamp) + 1) / 2  # 0.0 to 1.0
    
    effects = {
        "status": "CALCULATING",
        "glitch_intensity": random.uniform(0.1, 0.8),  # Random glitch spikes
        "liquid_volatility": base_distortion,          # Smooth breathing
        "color_palette": {
            "r": random.random(),
            "g": random.random(),
            "b": random.random()
        },
        "bloom_threshold": 0.2,
        "bloom_strength": 1.5 + (base_distortion * 0.5)
    }
    
    return jsonify(effects)

if __name__ == '__main__':
    print(">>> AI VISUAL ENGINE ONLINE ON PORT 5000")
    app.run(debug=True, port=5000)
