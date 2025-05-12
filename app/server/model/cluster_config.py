import pathlib
import yaml

configs = []

def get_configs():
    # init() # check if setup
    global configs
    return configs # return the local object

def get_config_by_id(id:str):
    global configs
    # got through the configs
    if len(configs) <= 0:
        print("no configs")
        return None
    for config in configs:
        print(f"{config['clusterId']} | id {id}")
        if config['clusterId'] == int(id):
            return config
    return None

def save_config(config_string:str,config_name:str):
    # config = yaml.safe_load(config_string)
    global configs
    # get the current length
    counter = len(configs)
    if counter <= 0:
        counter = 1    
    
    # convert to a dict
    config_dict = yaml.safe_load(config_string)
    config = {
        "clusterId":counter,
        "name":config_name,
        "status":"loading",
        "config":config_dict
    }
    configs.append(config) # add
    # return the object
    return config

def load_kubeconfig(config_location=None):
    # "./dummy.kubeconfig"
    if config_location is None:
        current_dir = pathlib.Path(__file__).parent.resolve()
        config_location = current_dir / "dummy.kubeconfig"
    # open
    try:
        with open(config_location) as file:
            return yaml.safe_load(file)
    except Exception as e:
        print("error caught and swalled")
    
def update_cluster_status(clusterId,status):
    # find the config
    config = get_config_by_id(clusterId)
    if config is None:
        print(f"cluster id {clusterId} doesn't exist")
        return
    global configs
    idx = configs.index(config) # get it before it's changed
    # update the status field
    config['status'] = status
    # save back
    configs[idx] = config
