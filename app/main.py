import os
import yaml

from k8s_agent import get_unhealthy_pods, get_pod_events, get_deployment_name, get_deployment, get_logs
from k8s_processor import get_error_messages

def load_kubeconfig(config_location="../example/kubeconfig"):
    with open(config_location) as file:
        return yaml.safe_load(file)

def orchestrator():
    # load up a kubeconfig into a dict
    kube_config_dict = load_kubeconfig()
    # now use it to get pods
    pods = get_unhealthy_pods("default",kube_config_dict)

    if len(pods) > 0:
        print("we have unhealth pods!")
        # build a store
        pods_in_error = []
        # loop
        for pod in pods:
            pod_data = {
                "name":pod.metadata.name,
                "events":[],
                "deployment":None,
                "logs":[]
            }
            print(f"pod name {pod.metadata.name}")
            filtered_events = []
            events = get_pod_events("default",pod.metadata.name,kube_config_dict)
            for event in events:                
                # print(f"event {event.reason}")
                if 'FailedScheduling' in event.reason or 'Failed' in event.reason:
                    filtered_events.append(event) # add it
                    # get the deployment name
                    deployment_name = get_deployment_name("default",pod.metadata.name,kube_config_dict)
                    # print(f"deployment name {deployment_name}")
                    # get the deployment
                    deployment = get_deployment("default",deployment_name,kube_config_dict)
                    pod_data['deployment'] = deployment
                    # print(f"deployment {deployment}")
                    # get the logs
                    logs = get_logs("default",pod.metadata.name,kube_config_dict)
                    pod_data['logs'] = logs
                
            # add the filtered events
            pod_data['events'] = filtered_events
            # add
            pods_in_error.append(pod_data)
        # check
        print(f"pods in error count {len(pods_in_error)}")
        print("----------------")
        # get the error messages
        # messages = get_error_messages(pods_in_error[0])
        # print(f"message {messages}")
        print(f"{pods_in_error[0]['deployment']}")


if __name__ == '__main__':
    orchestrator()