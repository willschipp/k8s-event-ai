import pathlib
import yaml

configs = []

def get_configs():
    init() # check if setup
    global configs
    return configs # return the local object

def save_config(config_string):
    config = yaml.safe_load(config_string)
    configs.append(config)

def load_kubeconfig(config_location=None):
    # "./dummy.kubeconfig"
    if config_location is None:
        current_dir = pathlib.Path(__file__).parent.resolve()
        config_location = current_dir / "dummy.kubeconfig"
    # open
    with open(config_location) as file:
        return yaml.safe_load(file)
    
#setup
def init():
    global configs
    if len(configs) > 0:
        return
    dummy = load_kubeconfig()
    configs.append(dummy)