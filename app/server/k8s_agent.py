import yaml
from kubernetes import client, config

# validate if this kubeconfig is good for a client
def valid_client(kubeconfig):
    # config
    api_client = config.new_client_from_config_dict(
        config_dict=kubeconfig,
        context=None,
        persist_config=False
    )
    # client
    try:
        client.CoreV1Api(api_client)    
        return True
    except Exception as err:
        print(f"error validating client {err}")
        return False

def get_client(kubeconfig):
    # config
    api_client = config.new_client_from_config_dict(
        config_dict=kubeconfig,
        context=None,
        persist_config=False
    )
    # client
    kubectl = client.CoreV1Api(api_client)    
    return kubectl

def get_app_client(kubeconfig):
    # config
    api_client = config.new_client_from_config_dict(
        config_dict=kubeconfig,
        context=None,
        persist_config=False
    )
    # client
    kubectl = client.AppsV1Api(api_client)    
    return kubectl

def get_unhealthy_pods(namespace,kubeconfig):
    pods = []

    try:
        # client
        kubectl = get_client(kubeconfig)
        # get
        pod_list = kubectl.list_namespaced_pod(namespace)
        # loop and check
        for pod in pod_list.items:
            if pod.status.container_statuses is None:
                print(f"couldn't get a status for {pod}")
                continue

            for container in pod.status.container_statuses:
                if container.state.waiting is not None or container.state.terminated is not None:
                    # waiting or terminated
                    pods.append(pod)
    except Exception as err:
        print(f"error getting unhealthy pods {err}")

    return pods

def get_pod_events(namespace,pod_name,kubeconfig):
    #setup filter
    field_selector = f"involvedObject.kind=Pod,involvedObject.name={pod_name}"

    try:
        kubectl = get_client(kubeconfig)
        events = kubectl.list_namespaced_event(
            namespace=namespace,
            field_selector=field_selector
        )
        print("returning event items")
        return events.items
    except Exception as err:
        print(f"error getting events for {pod_name} {err}")
        return []

def get_deployment_name(namespace,pod_name,kubeconfig):
    try:
        kubectl = get_client(kubeconfig)
        # get the pod details
        pod = kubectl.read_namespaced_pod(pod_name,namespace)

        if 'app' in pod.metadata.labels:
            print("from 'app'")
            # get it from here
            return pod.metadata.labels.get('app')

        if 'k8s-app' in pod.metadata.labels:
            print("from 'k8s-app'")
            return pod.metadata.labels.get('k8s-app')
        
        if 'pod-template-hash' in pod.metadata.labels:
            print("from 'hash'")
            rs_name = pod.metadata.owner_references[0].name
            return '-'.join(rs_name.split('-')[:-2]) # trim the hash
    except client.exceptions.ApiException as e:
        print(f"error getting deployment name {e}")
        return None

def get_deployment(namespace,deployment_name,kubeconfig):
    try:
        # get the client
        kubectl = get_app_client(kubeconfig)
        deployment = kubectl.read_namespaced_deployment(deployment_name,namespace)
        deployment_dict = client.ApiClient().sanitize_for_serialization(deployment)
        return yaml.dump(deployment_dict,default_flow_style=False,sort_keys=False)

    except Exception as e:
        print(f"error getting deployment {e}")
        return None

def get_logs(namespace,pod_name,kubeconfig):
    try:
        # get the client
        kubectl = get_client(kubeconfig)
        logs = kubectl.read_namespaced_pod_log(pod_name,namespace)
        return logs
    except Exception as e:
        print(f"error getting logs {e}")
        return None

def get_pod_status(namespace,pod_name,kubeconfig):
    try:
        # get the client
        kubectl = get_client(kubeconfig)
        pod = kubectl.read_namespaced_pod(pod_name,namespace)
        return pod.status.phase # current state
    except Exception as e:
        print(f"error getting pod status {e}")
        return None    

def get_namespaces(kubeconfig):
    try:
        kubectl = get_client(kubeconfig)
        namespaces = kubectl.list_namespace()
        names = []
        i = 0
        while i < len(namespaces.items):
            namespace_name = namespaces.items[i].metadata.name
            names.append(namespace_name)
            i = i + 1 # increment
        return names
    except Exception as e:
        print(f"error getting namespaces {e}")
        return None