import json
import re
import yaml

description_start = "##DESCRIPTION"
solution_start = "##SOLUTION"
step_start = "##STEP"
code_start = "##CODE"
code_end = "##ENCODE"


def get_start_index(token:str,text:str) -> int:
    start_index = text.find(token)
    if start_index == -1: # not found
        return -1
    start_index += len(token)
    return start_index

def get_end_index(token:str,text:str,startpos:int) -> int:
    end_index = text.find(token,startpos)
    if end_index == -1:
        return -1
    return end_index


def parse_responses(raw_response:str) -> dict:
    # structure of the response is 
    # description
    # solutions[]
    # solution has;
    # title
    # steps
    # code[]
    response = {
        "description":None,
        "solutions":[]
    }

    ##TODO validat this this response is usable at all

    #get the description
    start_index = get_start_index(description_start,raw_response)
    end_index = get_end_index(solution_start,raw_response,start_index) 
    description = raw_response[start_index:end_index].strip(' \t\n\r\v\f')           
    response['description'] = description
    # let's see if there are any solutions in this
    solution_count = raw_response.count(solution_start)
    if solution_count <= 0:
        print("no solutions proposed")
        return
        #TODO handle drop from here
    # use the end_index as the first solution
    counter = 1
    while counter <= solution_count:
        # make sure to increment
        counter += 1 #increment
        # start index is end_index + length of solution_start
        start_index = end_index + len(solution_start)
        end_index = get_end_index(step_start,raw_response,start_index)
        title = raw_response[start_index:end_index]
        print(f"title {title}")
        # now process the 'steps' and code from this point onwards
        # step
        start_index = end_index + len(step_start)
        

def parser(text):
    parsed_dict = {}
    solution_count = 0
    step_count = 0
    code_block = ""

    sections = re.split(r'(##DESCRIPTION|##SOLUTION \d+|##STEP \d+|##CODE|##ENDCODE)', text)
    sections = [s.strip() for s in sections if s.strip()]

    for i in range(0, len(sections), 2):
        section_type = sections[i]
        try:
            section_content = sections[i+1]
        except IndexError:
            if section_type == "##CODE":
                print("unclosed CODE blcok")
            break

        if section_type == "##DESCRIPTION":
            parsed_dict["DESCRIPTION"] = section_content
        elif section_type.startswith("##SOLUTION"):
            solution_count += 1
            solution_key = f"SOLUTION {solution_count}"
            parsed_dict[solution_key] = {}
            parsed_dict[solution_key]["steps"] = []
        elif section_type.startswith("##STEP"):
            step_count += 1
            step_key = f"STEP {step_count}"
            parsed_dict[f"SOLUTION {solution_count}"]["steps"].append({step_key: ""})
        elif section_type == "##CODE":
            code_block = section_content
        elif section_type == "##ENDCODE":
            parsed_dict[f"SOLUTION {solution_count}"]["steps"][-1][f"STEP {step_count}"] = code_block
            code_block = ""
    
    return parsed_dict




if __name__ == '__main__':
    test_text = ""
    # load up the text
    with open('../example/llm/gemini_1.5_sample_response.txt','r') as file:
        test_text = file.read() # read the whole thing in
    
    # test parse
    d = parser(test_text)
    print(d)
