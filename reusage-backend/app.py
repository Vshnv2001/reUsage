from flask import Flask, request
import pandas as pd
from evaluator_functions import get_industries
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
        if len(industries) < len(df):
            extension = ["" for i in range(len(df) - len(industries))]
            industries += extension
        elif len(industries) > len(df):
            df = df[:len(industries)]
        df['industry'] = industries
        dfWrapper.set_df(df)
        return {'rowCount': row_count, 'industries': industries}
    
    
@app.route('/industry_selection', methods=['GET'])
def add_metrics():
    industries = request.args.get('industries')
    industries = industries.split(',')
    df = dfWrapper.get_df()
    df = df[df['industry'].isin(industries)]
    selected_columns = ['problem', 'solution']
    selected_df = df[selected_columns]
    json_output = {'sampleIndustryValues': selected_df.to_dict(orient='records')}
    return json_output
        


if __name__ == '__main__':
    app.run(debug=True)

