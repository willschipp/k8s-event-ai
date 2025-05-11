import json
import yaml

# from server.k8s_agent import get_unhealthy_pods, get_pod_events, get_deployment_name, get_deployment, get_logs, get_namespaces
from k8s_agent import get_unhealthy_pods, get_pod_events, get_deployment_name, get_deployment, get_logs, get_namespaces

from llm_parser import call_gemini, get_json_from_gemini_response

prompt_template = '''
    You are a Kubernetes expert. Describe the following error and provide solutions for how to 
    resolve given the following deployment yaml. For any solution, deliminate each step with 
    the expression. Reply in using the JSON template. 
    Error=ERROR_MESSAGES
    Deployment=DEPLOYMENT
    JSON_Template={
        "description": "",
        "solutions": [
            {
                "solution_number": 1,
                "steps": [
                    {
                        "step": 1,
                        "process": "process"
                    }
                ]
            }
        ]
    }
'''

def load_kubeconfig(config_location):
    print("called load config")
    with open(config_location) as file:
        return yaml.safe_load(file)

def load_cluster(kube_config_dict:dict):
    print(f"getting namespaces")
    # get all the namespaces
    namespaces = get_namespaces(kube_config_dict)
    if namespaces is not None:
        # for each namespace, check for pods
        for ns in namespaces:
            # now use it to get pods
            pods = get_unhealthy_pods(ns,kube_config_dict)

            if len(pods) > 0:
                print("we have unhealthy pods!")
                # build a store
                event_counter = 0
                pods_in_error = []
                # loop
                for pod in pods:
                    event_counter += 1
                    pod_data = {
                        "name":pod.metadata.name,
                        "events":[],
                        "deployment":None,
                        "logs":[],
                        "namespace":ns,
                        "eventId":event_counter
                    }
                    print(f"pod name {pod.metadata.name}")
                    filtered_events = []
                    events = get_pod_events(ns,pod.metadata.name,kube_config_dict)
                    for event in events:                
                        print(f"event {event.reason}")
                        if 'FailedScheduling' in event.reason or 'Failed' in event.reason:
                            ev = {
                                "message":event.message,
                                "reason":event.reason,
                                "kind":event.kind,
                                "count":event.count,
                                "action":event.action,
                                "timestamp":event.event_time,
                                "type":event.type
                            }
                            filtered_events.append(ev) # add it
                            # get the deployment name
                            deployment_name = get_deployment_name(ns,pod.metadata.name,kube_config_dict)
                            # print(f"deployment name {deployment_name}")
                            # get the deployment
                            deployment = get_deployment(ns,deployment_name,kube_config_dict)
                            pod_data['deployment'] = deployment
                            # print(f"deployment {deployment}")
                            # get the logs
                            logs = get_logs(ns,pod.metadata.name,kube_config_dict)
                            pod_data['logs'] = logs                    
                    # add the filtered events
                    pod_data['events'] = filtered_events
                    # add
                    pods_in_error.append(pod_data)
                # return
                return pods_in_error
    else:
        print("no namespaces")


def get_solutions(events):
    deployment = ""
    message = ""
    # build the prompt context
    for event in events:
        # get the inside events
        event_list = event['events']
        for e in event_list:
            deployment = e['deployment']
            for inner_event in e['events']:
                message = message + "\n" + inner_event['message'] + "\n"
    # now we have a message and a deployment
    # get the prompt template      
    prompt = prompt_template.replace('ERROR_MESSAGES',message).replace('DEPLOYMENT',deployment)  
    # send
    response = call_gemini(prompt)
    # response is a json object
    response_string = response['candidates'][0]['content']['parts'][0]['text'] 
    # convert it
    response_json = get_json_from_gemini_response(response_string)
    # return
    return response_json
    


if __name__ == '__main__':
    # reconsitute events
    events = []
    with open('./sample_events.json','r') as f:
        events = json.load(f)
    # call
    get_solutions(events)
