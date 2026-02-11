# logic.py
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow the 3D site to access this API

# This acts as the "Brain" of your portfolio
@app.route('/api/profile-data', methods=['GET'])
def get_profile_data():
    return jsonify({
        "status": "ONLINE",
        "system_version": "vX6.01",
        "nodes": [
            {
                "id": 1,
                "title": "NOVUSFACE AI",
                "type": "AI_MODEL",
                "stats": {"accuracy": "98%", "latency": "20ms"},
                "description": "DeepFake engine with stealth processing."
            },
            {
                "id": 2,
                "title": "TUBEMAN",
                "type": "UTILITY",
                "stats": {"downloads": "5000+", "speed": "MAX"},
                "description": "YouTube extraction protocol."
            }
        ]
    })

if __name__ == '__main__':
    print(">>> NEURAL CORE INITIALIZED ON PORT 5000")
    app.run(debug=True, port=5000)
