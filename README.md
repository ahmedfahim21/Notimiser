<a name="readme-top"></a>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ahmedfahim21/Notimiser">
    <img src="./client/public/blue-logo.png" alt="Logo" width="80">
  </a>

<h3 align="center">NOTIMISER</h3>

  <p align="center">
    Notimiser is a web application that utilizes machine learning techniques to improve the user experience in summarizing academic and non-academic texts. The application offers the ability to upload images or pdf documents and generates a summarized version of the content, complemented with required images.
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage/Examples

To use Notimiser, follow these steps:

Open the web application in your web browser.
Upload a PDF document using the provided form.
Click the "Notimise" button to receive a summary of the document.

### Built With


* [![React][React.js]][React-url]
* ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
* ![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
* ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.


### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/ahmedfahim21/Notimiser.git
   ```
2. Install and start frontend
   ```sh
   cd client
   npm install
   npm start
   ```
3. Install and start the backend
   ```sh
   cd server
   pipenv install --python 3
   pipenv shell
   flask run
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



[product-screenshot]: ./client/public/Screenshot.png

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

## Summarisation Techniques

PDF Summarisation using Flask uses extractive and abstractive summarisation techniques to generate a summary of the document. Extractive summarisation involves selecting important sentences from the original document and combining them to form a summary. 
Abstractive Summarisation will generate it's own summary. 
The choice of either is decided by our classification algorithm, where we decide to go with the former if the corpus is related to academia or the latter if not.

## Machine Learning Model

PDF Summarisation using Flask uses a Support Vector Machine (SVM) model for document classification. The model was trained on a dataset of labelled documents using scikit-learn. The following preprocessing steps were applied to the data:

Tokenization: splitting the text into individual words
Stopword removal: removing common words that do not provide useful information
Stemming: reducing words to their base form
The features used for classification were Sentence Transformer vectors. The SVM algorithm was chosen because it has been shown to perform well for text classification tasks.


## Vision

- [ ] We plan to increase the scalability of this application, along with introducing the multifarious plug-ins offered by various AI organizations. 
- [ ] This can help alongside our summarization to better streamline the information to the user. 
- [ ] Our aim is also to make use of more Generative AI Models like Whisper, GPTs, DALL-E, Codex and many more to provide more support to the user.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
