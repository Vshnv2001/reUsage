from flask import Flask, request
import pandas as pd
from evaluator_functions import get_industries

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400

    if file:
        df = pd.read_csv(file)
        row_count = len(df)
        industries = get_industries(df).split(',')
        return {'rowCount': row_count, 'industries': industries}

if __name__ == '__main__':
    app.run(debug=True)
