import json
import os
import requests

gemini_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=API_KEY"
api_key = os.getenv('LLM_KEY')

gemini_request_template = '''
    {
    "contents":
        [
            {
            "parts":
                [
                    {"text":"CONTENT_HERE"}
                ]
            }
        ]
    }
'''

def call_gemini(prompt: str) -> str:
    try:
        url = gemini_url
        url = url.replace("API_KEY",api_key)
        headers = {"Content-type":"application/json"}
        # escape the string
        clean_prompt = json.dumps(prompt)[1:-1]
        final_prompt = gemini_request_template.replace("CONTENT_HERE",clean_prompt)
        # send
        response = requests.post(url,data=final_prompt,headers=headers)
        response.raise_for_status()
        # response_string = json.dumps(response.json())
        # return response_string
        return response.json()
    except requests.exceptions.RequestException as err:
        print(f"an error occurred: {err.args[0]}")
        return None

def get_json_from_gemini_response(response:str):
    # expects string to start with ```json
    # and end with ```
    start_marker = "```json"
    end_marker = "```"    
    start_index = response.find(start_marker)
    if start_index == -1:
        print("not a correct string - no starter")
        return None # not a correct string
    start_index += len(start_marker)
    # end_index = response.find(end_marker,start_index)
    end_index = response.rfind(end_marker)
    if end_index == -1:
        print("not a correct string - no finish")
        return None # not a correct string
    stripped = response[start_index:end_index].strip()
    # convert to a dict
    return json.loads(stripped)