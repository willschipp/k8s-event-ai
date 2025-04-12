# k8s-event-ai
process to listen for Kubernetes events and process for suggestions

## Process Flow
- scan a namespace for new pods
- subscribe to events for a pod
- if there's a 'failed' event, ask an LLM for fixes/suggestions
- extract existing deployment that's failing and respond with "corrected" deployment

## Considerations
- deploy on CPU
- register of found pods, labels, previous issues and current state
- leverage existing kubernetes info vs historical info
- target JSON persistence
