#Pickled Model for Flask.

import string
import re
import nltk
import contractions
import pickle
import pandas as pd
import torch
from transformers import T5Tokenizer, T5ForConditionalGeneration, T5Config
import os
import nltk
nltk.download('wordnet')
from flask import Flask, request, jsonify
from flask_cors import CORS
from PyPDF2 import PdfReader
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.text_rank import TextRankSummarizer
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
nltk.download("stopwords")
from sentence_transformers import SentenceTransformer
from nltk.tokenize import sent_tokenize
from summarizer.sbert import SBertSummarizer


model0 = T5ForConditionalGeneration.from_pretrained('t5-small')
tokenizer = T5Tokenizer.from_pretrained('t5-small')
device = torch.device('cpu')

#FLAG=0 is default for non academic, which uses abstractive summarization
FLAG=0

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

    lst = [0]
    train_df = pd.DataFrame(lst) 
    train_df[0].iloc[0]=text
    train_df["text_clean"] = train_df[0].apply(lambda x: x.lower())
    train_df["text_clean"] = train_df["text_clean"].apply(lambda x: contractions.fix(x))
    train_df['tokenized'] = train_df['text_clean'].apply(word_tokenize)
    train_df["text_clean"] = train_df["text_clean"].apply(lambda x: remove_punct(x))
    train_df['text_clean']=train_df['text_clean'].apply(lambda x: remove_tag(x) )
    stop = set(stopwords.words('english'))
    train_df['stopwords_removed'] = train_df['text_clean'].apply(lambda x: [word for word in x.split() if word not in stop])
    train_df.head()
    lemmatizer = WordNetLemmatizer()
    train_df['lemmatize_word_wo_pos'] = train_df['stopwords_removed'].apply(lambda x: [lemmatizer.lemmatize(word) for word in x])
    train_df['lemmatize_word_wo_pos'] = train_df['lemmatize_word_wo_pos'].apply(lambda x: [word for word in x if word not in stop])
    train_df.head()

    train_df['final'] = train_df['lemmatize_word_wo_pos'].apply(lambda x: convert(x))

    model = SentenceTransformer('all-MiniLM-L6-v2')
    train_df['embeddings']=train_df['final'].apply(lambda x: model.encode(x))

    array=train_df['embeddings'][0]
    array=array.reshape(1,-1)

    print(array.shape)
    model = pickle.load(open('model.pkl','rb'))
    print(model.predict(array))

    #list of words to remove before 
    remove=['i',
    'me',
    'my',
    'myself',
    'we',
    'our',
    'ours',
    'ourselves',
    'you',
    "you're",
    "you've",
    "you'll",
    "you'd",
    'your',
    'yours',
    'yourself',
    'yourselves',
    'he',
    'him',
    'his',
    'himself',
    'she',
    "she's",
    'her',
    'hers',
    'herself',
    'it',
    "it's",
    'its',
    'itself',
    'they',
    'them',
    'their',
    'theirs',
    'themselves',
    'what',
    'which',
    'who',
    'whom',
    'this',
    'that',
    "that'll",
    'these',
    'those',
    'am',
    'is',
    'are',
    'was',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'had',
    'having',
    'do',
    'does',
    'did',
    'doing',
    'a',
    'an',
    'the',
    'and',
    'but',
    'if',
    'or',
    'because',
    'as',
    'until',
    'while',
    'of',
    'at',
    'by',
    'for',
    'with',
    'about',
    'against',
    'between',
    'into',
    'through',
    'during',
    'before',
    'after',
    'above',
    'below',
    'to',
    'from',
    'up',
    'down',
    'in',
    'out',
    'on',
    'off',
    'over',
    'under',
    'again',
    'further',
    'then',
    'once',
    'here',
    'there',
    'when',
    'where',
    'why',
    'how',
    'all',
    'any',
    'both',
    'each',
    'few',
    'more',
    'most',
    'other',
    'some',
    'such',
    'no',
    'nor',
    'not',
    'only',
    'own',
    'same',
    'so',
    'than',
    'too',
    'very',
    's',
    't',
    'can',
    'will',
    'just',
    'don',
    "don't",
    'should',
    "should've",
    'now',
    'd',
    'll',
    'm',
    'o',
    're',
    've',
    'y',
    'ain',
    'aren',
    "aren't",
    'couldn',
    "couldn't",
    'didn',
    "didn't",
    'doesn',
    "doesn't",
    'hadn',
    "hadn't",
    'hasn',
    "hasn't",
    'haven',
    "haven't",
    'isn',
    "isn't",
    'ma',
    'mightn',
    "mightn't",
    'mustn',
    "mustn't",
    'needn',
    "needn't",
    'shan',
    "shan't",
    'shouldn',
    "shouldn't",
    'wasn',
    "wasn't",
    'weren',
    "weren't",
    'won',
    "won't",
    'wouldn',
    "wouldn't",
    'We',
    'we',
    'I',
    'know',
    'think',
    'believe',
    'experience',
    'may',
    'can',
    'probably',
    'possibly',
    'example', 'I', 'cannot', 'could', 'should', 'wish', 'think', 'thought']
    cleaner=stopword(text)

    if model.predict(array)[0]==1:
        
        n=len(sent_tokenize(cleaner))
        num_sentences= n//1.5
        model = SBertSummarizer('paraphrase-MiniLM-L6-v2')
        result = model(cleaner, num_sentences)
        print (result)

    else:
        #use the abstractive model.
        preprocessed_text = text.strip().replace('\n','')
        t5_input_text = 'summarize: ' + preprocessed_text
        tokenized_text = tokenizer.encode(t5_input_text, return_tensors='pt', max_length=512).to(device)
        summary_ids = model0.generate(tokenized_text, min_length=40, max_length=120)
        result = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        print (result)

    

    # parser = PlaintextParser.from_string(text, Tokenizer("english"))
    # summarizer = TextRankSummarizer()
    # summary = summarizer(parser.document, sentences_count=3)
    # summary_text = ""
    # for sentence in summary:
    #     summary_text += str(sentence) + " "

    # print(text)
    return jsonify({'extracted_text': text, 'summary_text': result})



def remove_punct(text):
    return text.translate(str.maketrans('', '', string.punctuation))

def remove_tag(x):
    x=x.replace("\n", "")
    x=x.replace("\r", "")
    x=x.replace("\t", "")
    return x

def lemmatize_word(text):
    lemmatizer = WordNetLemmatizer()
    lemma = [lemmatizer.lemmatize(word, tag) for word, tag in text]
    return lemma

def convert(x):
    string=""
    for y in x:
        string=string +" " + y
    return string 

def stopword(data):
    return data
