import json
import re
import yaml

# {
#     "description": "",
#     "solutions": [
#         {
#             "solution_number": 1,
#             "steps": [
#                 {
#                     "step": 1,
#                     "process": "process"
#                 }
#             ]
#         }
#     ]
# }
def parser(response:str): # assume response is json fragment that fits the tempalte
    # get structure
    response_json = json.loads(response)
    return response_json




if __name__ == '__main__':
    test_text = ""
    # load up the text
    with open('../../example/llm/gemini_1.5_flash_sample_response.json','r') as file:
        test_text = file.read() # read the whole thing in
    
    # test parse
    d = parser(test_text)
    print(d)
