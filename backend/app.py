from flask import Flask, request
import json
from inference2 import recommend_hotels
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route("/search/", methods=['GET', 'POST'])
def search():
    if request.method == 'POST':
        data = request.data.decode()
        if (data):
            data = json.loads(data)
            if ("query" in data):
                return recommend_hotels(data['query'])
        return {"msg": "No query provided"}, 400
