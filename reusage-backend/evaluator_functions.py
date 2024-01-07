import openai
import os
from dotenv import load_dotenv
import pandas as pd
import time

# Load environment variables from .env file
load_dotenv()

# Retrieve the API key from the environment variable
api_key = os.getenv("OPENAI_API_KEY")

# Create an instance of the OpenAI client
client = openai.OpenAI(api_key=api_key)


def get_industries(df):
    # Iterate through each problem statement and generate industry prediction
    # df = df.head(20)
    industries = []
    problem_column = 'problem'
    industry_column = 'industry'
    i = 0
    # assistant = client.beta.assistants.create(
    #     name="Industry Prediction Assistant",
    #     instructions="You are an industry prediction expert. Given a list of problem statements, give a list of the industries that they belong to or try to solve. Give only the industry and nothing else - not even the word 'industry' - try to limit it to two words at max. Return a list of the industries separated by commas.",
    #     tools=[{"type": "retrieval"}],
    #     model="gpt-4-1106-preview"
    # )
    assistant_id = "asst_GojIGPi4W41fBrf8R8u1AzsV"
    thread = client.beta.threads.create()
    thread_id = thread.id
    print("Thread ID: " + thread_id)
    problem_statements = ""
    i = 0
    for problem in df[problem_column]:
        # if i ==2:
        #     break
        # else:
        #     i += 1
        try:
            print(problem)
            problem_statements += problem + "\n"
        except TypeError:
            # This means that we have reached EOF and break out of for loop
            break

    message = client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content="Find the industries in these problem statements: \n" + problem_statements,
    )
    run = client.beta.threads.runs.create(
        thread_id=thread_id,
        assistant_id=assistant_id,
        instructions="Only give the industry names and nothing else - not even the word 'industry' - try to limit it to two words at max. Return a list of the industries separated by commas. If a problem statement has two industries, list both and separate them with an &."
    )

    # If run is 'completed', get messages and print
    while True:
        # Retrieve the run status
        run_status = client.beta.threads.runs.retrieve(
            thread_id=thread.id, run_id=run.id)
        print(run_status.model_dump_json(indent=4))
        time.sleep(10)
        if run_status.status == 'completed':
            messages = client.beta.threads.messages.list(thread_id=thread.id)
            # print("message:")
            # print(messages)
            break
        else:
            # sleep again
            time.sleep(2)
    return messages.data[0].content[0].text.value


def wait_on_run(run, thread):
    while run.status == "queued" or run.status == "in_progress":
        run = client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id,
        )
        time.sleep(0.5)
    return run
