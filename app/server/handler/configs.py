from flask import Blueprint, jsonify, request
import json

from server.model.cluster_config import get_configs, save_config

cfg = Blueprint('cfg',__name__)

@cfg.route('/api/cluster/config',methods=['GET'])
def get_configurations():
    # retrieve the configs
    configs = get_configs()
    # these are yaml objects - lets see how they serialize
    return jsonify({
        "configs":configs
    }),200

@cfg.route('/api/cluster/config',methods=['POST'])
def save_configuration():
    form_data = request.form.to_dict()
    # get the yaml filed
    config = form_data.get('config_yaml')
    # save
    save_config(config)
    # return
    return "",201
