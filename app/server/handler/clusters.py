from flask import Blueprint, jsonify, request
import json
import yaml
import threading

from server.model.cluster_config import get_configs, save_config, get_config_by_id
from server.model.cluster_events import get_events, check_events
# from server.orchestrator import load_cluster_in_background, load_cluster

clusters = Blueprint('clusters',__name__)

@clusters.route('/api/clusters',methods=['GET'])
def get_configurations():
    # retrieve the configs
    configs = get_configs()
    # these are yaml objects - lets see how they serialize
    return jsonify({
        "clusters":configs
    }),200

@clusters.route('/api/clusters',methods=['POST'])
def save_configuration():
    form_data = request.form.to_dict()
    # get the yaml filed
    config = form_data.get('cluster_yaml')
    # try to convert
    cluster_name = form_data.get('cluster_name')
    # save
    complete_config = save_config(config,cluster_name)
    # start the background process
    load_cluster_in_background(complete_config['clusterId']) #send the id
    # return
    return "",201

@clusters.route('/api/clusters/<clusterId>',methods=['GET'])
def get_configuration(clusterId):
    # get the id
    config = get_config_by_id(clusterId)
    if config != None:
        return jsonify(config),200
    return "",404

@clusters.route('/api/clusters/<clusterId>/events',methods=['GET'])
def get_cluster_events(clusterId):
    # get all the events registered for a cluster
    events = get_events(clusterId)
    if events != None and len(events) > 0:
        # loop and build a sendable set
        for event in events:
            return jsonify({"events":event['events']}),200
    return "",404 # nothing found

@clusters.route('/api/clusters/<clusterId>',methods=['PUT'])
def update_cluster(clusterId):
    # get the cluster details
    cluster = get_config_by_id(clusterId)
    if cluster is None:
        return "",404
    # load the cluster
    # load_cluster(cluster['config'])
    check_events(clusterId)
    return "",204


def load_cluster_in_background(clusterId):
    print("starting background")
    for th in threading.enumerate():
        if th.name == "processing_thread":
            break
    else:
        bg_thread = threading.Thread(target=check_events,name="processing_thread",args=[clusterId])
        bg_thread.daemon = True
        bg_thread.start()