# reUsage
Circular Economy Evaluator

## Pre-requisites

### Installations
Node
Python
pip
npm

### OpenAI API Key
You will need an OpenAI API key. Create a `.env` file under `reusage-backend` and enter the below line into the file:

`OPENAI_API_KEY=<YOUR-OPENAI-API-KEY>`

## Instructions to run frontend and backend
Navigate to `realsage-frontend/`. 
Run `npm install` to install your frontend packages. 
Next, run `npm run start` to start your frontend.
Navigate to `realsage-backend/`.
Run `python -m venv venv`.
Activate your virtual environment either using venv/Scripts/activate for Windows or source venv/bin/activate for Mac.
Run pip install -r requirements.txt
Run backend using flask run
Open your frontend through your terminal to begin using our application (https://localhost:3000)

## Instructions for file input
Our program only accepts files with UTF-8 encoding. 
To save your Excel file as UTF-8, please open your file in Excel and save your file as CSV with UTF-8 encoding. 
Our program accepts an unspecified number of rows (not tested yet) so please only use like ~10 entries at a time. 
