from flask import Flask, request, jsonify
import pandas as pd
from evaluator_functions import get_industries, get_metric
from DfWrapper import DfWrapper
from flask_cors import CORS

app = Flask(__name__)
dfWrapper = DfWrapper()
CORS(app, resources={r'/*': {'origins': '*'}})


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400

    if file:
        df = pd.read_csv(file, encoding='latin-1')
        row_count = len(df)
        industries = get_industries(df).split(',')
        industries = industries.split('\n')
        if len(industries) < len(df):
            extension = ["" for i in range(len(df) - len(industries))]
            industries += extension
        elif len(industries) > len(df):
            df = df[:len(industries)]
        df['industry'] = industries
        dfWrapper.set_df(df)

        # Remove empty strings from industries
        industries = [industry for industry in industries if industry != '']

        return {'rowCount': row_count, 'industries': list(set(industries))}


@app.route('/industry_selection', methods=['POST'])
def add_metrics():
    print("/industry_selection called!")
    # Access data from request body
    data = request.get_json()
    industries = data.get('industries')
    df = dfWrapper.get_df()
    df = df[df['industry'].isin(industries)]
    selected_columns = ['problem', 'solution', 'relevance', 'specificity']
    selected_df = df[selected_columns]
    relevances = get_metric(df, 'relevance')
    specificities = get_metric(df, 'specificity')
    relevances = relevances.split(',')
    specificities = specificities.split(',')
    if len(relevances) < len(df):
        extension = ["" for i in range(len(df) - len(relevances))]
        relevances += extension
    elif len(relevances) > len(df):
        df = df[:len(relevances)]
    if len(specificities) < len(df):
        extension = ["" for i in range(len(df) - len(specificities))]
        specificities += extension
    elif len(specificities) > len(df):
        df = df[:len(specificities)]
    json_output = {
        'sampleIndustryValues': selected_df.to_dict(orient='records')}
    return jsonify(json_output)


if __name__ == '__main__':
    app.run(debug=True)
