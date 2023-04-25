import os

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__) 
CORS(app) 


@app.route('/upload', methods=['POST'])
def upload():
    return {"message": "HackToFuture"}