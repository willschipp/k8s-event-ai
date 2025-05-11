from server.model.cluster_config import get_config_by_id
from server.orchestrator import load_cluster

event_register = []

#def process an event into a register
def check_events(clusterId:str):
    # get the cluster object
    config = get_config_by_id(clusterId)
    # use the name in the events
    cluster_name = config['name']
    # setup a check up
    pods_in_error = load_cluster(config['config'])
    global event_register
    # check
    if pods_in_error and len(pods_in_error) > 0:
        # we have events for that cluster
        event = {
            "clusterId":clusterId,
            "clusterName":cluster_name,
            "events":pods_in_error
        }
        event_register.append(event)
        return
    else:
        # clean up the register
        i = 0
        while i < len(event_register):
            if event_register[i]['clusterId'] == clusterId:
                event_register.pop(i)
        return
    # have clean register

def get_events(clusterId):
    global event_register
    filtered_events = [event for event in event_register if event['clusterId'] == int(clusterId)]
    return filtered_events

