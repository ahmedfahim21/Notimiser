import os

from flask import Flask, request, jsonify
from flask_cors import CORS
from PyPDF2 import PdfReader
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.text_rank import TextRankSummarizer

app = Flask(__name__) 
CORS(app) 


@app.route('/upload', methods=['POST'])
def upload():
    uploaded_file = request.files['file']
    start_page = int(request.form['start_page'])
    end_page = int(request.form['end_page'])
    pdf_reader = PdfReader(uploaded_file)
    num_pages = len(pdf_reader.pages)
    if end_page > num_pages:
        end_page = num_pages
    text = ""
    for page in range(start_page-1, end_page):
        text += pdf_reader.pages[page].extract_text()

    parser = PlaintextParser.from_string(text, Tokenizer("english"))
    summarizer = TextRankSummarizer()
    summary = summarizer(parser.document, sentences_count=3)
    summary_text = ""
    for sentence in summary:
        summary_text += str(sentence) + " "

    print(text)
    return jsonify({'extracted_text': text, 'summary_text': summary_text})