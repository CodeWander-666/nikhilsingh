from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

EVENTS = [
    {"type": "ALERT", "msg": "Traffic spike detected in Sector 4.", "severity": "HIGH"},
    {"type": "INFO", "msg": "Cloud resources optimized.", "severity": "LOW"},
    {"type": "WARN", "msg": "Unauthorized access attempt blocked.", "severity": "MED"},
    {"type": "INTEL", "msg": "New technology unlocked: GPT-4 Integration.", "severity": "LOW"}
]

@app.route('/api/tactical-update', methods=['GET'])
def tactical_update():
    # Simulates a live game director sending random events
    if random.random() > 0.7:
        event = random.choice(EVENTS)
        return jsonify(event)
    return jsonify({"type": "NONE", "msg": "Sector clear."})

if __name__ == '__main__':
    app.run(port=5000)
