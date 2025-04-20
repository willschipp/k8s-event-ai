

# pod_data = {
#                 "name":pod.metadata.name,
#                 "events":[],
#                 "deployment":None,
#                 "logs":[]
#             }

def get_error_messages(pod_in_error):
    # build holder
    messages = []
    for event in pod_in_error['events']:
        messages.append(event.message)
    return messages