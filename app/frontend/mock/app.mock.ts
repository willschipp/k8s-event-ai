import { MockHandler } from 'vite-plugin-mock-server'

const mocks: MockHandler[] = [
    {
        pattern: '/api/clusters/1/events',
        handle: (req,res) => {
            res.end(JSON.stringify({
                "events":[
                    {
                        "eventId":1,
                        "deployment":"deployment",
                        "description":"'0/3 nodes are available: persistentvolumeclaim \"mongodb-pvc\" not found. preemption: 0/3 nodes are available: 3 Preemption is not helpful for scheduling.', 'Error: secret \"mongodb-secrets\" not found'"
                    }
                ]
            }));
        }
    },
    {
        pattern: '/api/clusters',
        handle: (req,res) => {
            res.end(JSON.stringify({
                "clusters":[
                    {
                        "clusterId":1,
                        "name":"a name goes here"
                    }
                ]
            }));
        }
    }, 
    {
        pattern: '/api/clusters/1/events/1',
        handle: (req,res) => {
            res.end(JSON.stringify({
                "event":{
                    "eventId":1,
                    "description":"'0/3 nodes are available: persistentvolumeclaim \"mongodb-pvc\" not found. preemption: 0/3 nodes are available: 3 Preemption is not helpful for scheduling.', 'Error: secret \"mongodb-secrets\" not found'",
                    "deployment":"deployment"
                },
                "solution":{
                    "description": "The Kubernetes deployment for MongoDB is failing due to two main issues:  the PersistentVolumeClaim (PVC) 'mongodb-pvc' and the Secret 'mongodb-secrets' are not found. This prevents the pods from being scheduled and the deployment from progressing.",
                    "solutions": [
                        {
                        "solution_number": 1,
                        "steps": [
                            {
                            "step": 1,
                            "process": "**Create the PersistentVolumeClaim (PVC):**  This PVC defines the storage that your MongoDB deployment will use.  You need to create a PVC that's compatible with your Kubernetes cluster's storage configuration. Example:\n```yaml\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: mongodb-pvc\nspec:\n  accessModes:\n  - ReadWriteOnce\n  resources:\n    requests:\n      storage: 10Gi # Adjust storage size as needed\n```\nApply this YAML file using `kubectl apply -f mongodb-pvc.yaml`"
                            },
                            {
                            "step": 2,
                            "process": "**Create the Secret:** This secret holds the MongoDB root username and password. This keeps sensitive information out of your deployment YAML.  Example:\n```yaml\napiVersion: v1\nkind: Secret\nmetadata:\n  name: mongodb-secrets\ntype: Opaque\nstringData:\n  username: \"your_mongodb_username\"\n  password: \"your_strong_mongodb_password\"\n```\nApply this YAML file using `kubectl apply -f mongodb-secrets.yaml`. **Ensure to replace placeholders with your actual credentials.**"
                            },
                            {
                            "step": 3,
                            "process": "**Verify the PVC and Secret:** After applying the above YAMLs, verify their creation using:\n`kubectl get pvc mongodb-pvc`\n`kubectl get secret mongodb-secrets`\nBoth commands should show successful creation."
                            },
                            {
                            "step": 4,
                            "process": "**Check for other errors:** Once the PVC and Secret are created, check for any additional error messages using `kubectl describe deployment mongodb` and `kubectl get pods -w` . If additional errors persist, address them individually. This might involve checking for issues with your Kubernetes cluster's configuration, networking, or the MongoDB image itself."
                            },
                            {
                            "step": 5,
                            "process": "**Restart the Deployment (Optional):** If the deployment is still stuck, it can be helpful to delete and recreate it to ensure it picks up the newly created resources:\n`kubectl delete deployment mongodb`\n`kubectl apply -f your_deployment.yaml` (Replace `your_deployment.yaml` with the actual filename of your deployment YAML)."
                            }
                        ]
                        }
                    ]
                }
            }))
        }
    }  
]

export default mocks