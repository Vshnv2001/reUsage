import openai
from dotenv import load_dotenv
import pandas as pd
import os

# Load environment variables from .env file
load_dotenv()

# Set your OpenAI GPT-3 API key
openai.api_key = os.getenv("OPENAI_API_KEY")

def get_industries(df):
        # Iterate through each problem statement and generate industry prediction
    industries = []
    problem_column = 'problem'
    industry_column = 'industry'
    
    for problem in df[problem_column]:
        # Request to OpenAI GPT-3 API
        prompt_prelude = "This is a problem statement. Please predict the industry that this problem statement belongs to.\n\nProblem statement: "
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt_prelude + problem,
            max_tokens=50,  # Adjust max tokens as needed
            n=1,  # Number of completions
            stop=None  # Use "None" for no stopping rule
        )
        # Extract the generated text
        generated_text = response['choices'][0]['text']
        industries.append(generated_text.strip())

    # Add the 'industry' column to the DataFrame
    df[industry_column] = industries
    return df

earthhack_df = pd.read_csv('ai_earthhack_dataset.csv')
get_industries(earthhack_df).to_csv('ai_earthhack_dataset_with_industries.csv', index=False)