import { MockHandler } from 'vite-plugin-mock-server'

const mocks: MockHandler[] = [
    {
        pattern: '/api/clusters/1/events',
        handle: (req,res) => {
            res.end(JSON.stringify({
                "events": [{
                    "deployment": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  annotations:\n    deployment.kubernetes.io/revision: '1'\n    kubectl.kubernetes.io/last-applied-configuration: '{\"apiVersion\":\"apps/v1\",\"kind\":\"Deployment\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"mongodb\"},\"name\":\"mongodb\",\"namespace\":\"default\"},\"spec\":{\"replicas\":1,\"selector\":{\"matchLabels\":{\"app\":\"mongodb\"}},\"template\":{\"metadata\":{\"labels\":{\"app\":\"mongodb\"}},\"spec\":{\"containers\":[{\"env\":[{\"name\":\"MONGO_INITDB_ROOT_USERNAME\",\"valueFrom\":{\"secretKeyRef\":{\"key\":\"username\",\"name\":\"mongodb-secrets\"}}},{\"name\":\"MONGO_INITDB_ROOT_PASSWORD\",\"valueFrom\":{\"secretKeyRef\":{\"key\":\"password\",\"name\":\"mongodb-secrets\"}}}],\"image\":\"mongo:latest\",\"name\":\"mongodb\",\"ports\":[{\"containerPort\":27017}],\"volumeMounts\":[{\"mountPath\":\"/data/db\",\"name\":\"mongodb-data\"}]}],\"volumes\":[{\"name\":\"mongodb-data\",\"persistentVolumeClaim\":{\"claimName\":\"mongodb-pvc\"}}]}}}}\n\n      '\n  creationTimestamp: '2025-05-11T21:04:30+00:00'\n  generation: 1\n  labels:\n    app: mongodb\n  managedFields:\n  - apiVersion: apps/v1\n    fieldsType: FieldsV1\n    fieldsV1:\n      f:metadata:\n        f:annotations:\n          .: {}\n          f:kubectl.kubernetes.io/last-applied-configuration: {}\n        f:labels:\n          .: {}\n          f:app: {}\n      f:spec:\n        f:progressDeadlineSeconds: {}\n        f:replicas: {}\n        f:revisionHistoryLimit: {}\n        f:selector: {}\n        f:strategy:\n          f:rollingUpdate:\n            .: {}\n            f:maxSurge: {}\n            f:maxUnavailable: {}\n          f:type: {}\n        f:template:\n          f:metadata:\n            f:labels:\n              .: {}\n              f:app: {}\n          f:spec:\n            f:containers:\n              k:{\"name\":\"mongodb\"}:\n                .: {}\n                f:env:\n                  .: {}\n                  k:{\"name\":\"MONGO_INITDB_ROOT_PASSWORD\"}:\n                    .: {}\n                    f:name: {}\n                    f:valueFrom:\n                      .: {}\n                      f:secretKeyRef: {}\n                  k:{\"name\":\"MONGO_INITDB_ROOT_USERNAME\"}:\n                    .: {}\n                    f:name: {}\n                    f:valueFrom:\n                      .: {}\n                      f:secretKeyRef: {}\n                f:image: {}\n                f:imagePullPolicy: {}\n                f:name: {}\n                f:ports:\n                  .: {}\n                  k:{\"containerPort\":27017,\"protocol\":\"TCP\"}:\n                    .: {}\n                    f:containerPort: {}\n                    f:protocol: {}\n                f:resources: {}\n                f:terminationMessagePath: {}\n                f:terminationMessagePolicy: {}\n                f:volumeMounts:\n                  .: {}\n                  k:{\"mountPath\":\"/data/db\"}:\n                    .: {}\n                    f:mountPath: {}\n                    f:name: {}\n            f:dnsPolicy: {}\n            f:restartPolicy: {}\n            f:schedulerName: {}\n            f:securityContext: {}\n            f:terminationGracePeriodSeconds: {}\n            f:volumes:\n              .: {}\n              k:{\"name\":\"mongodb-data\"}:\n                .: {}\n                f:name: {}\n                f:persistentVolumeClaim:\n                  .: {}\n                  f:claimName: {}\n    manager: kubectl-client-side-apply\n    operation: Update\n    time: '2025-05-11T21:04:30+00:00'\n  - apiVersion: apps/v1\n    fieldsType: FieldsV1\n    fieldsV1:\n      f:metadata:\n        f:annotations:\n          f:deployment.kubernetes.io/revision: {}\n      f:status:\n        f:conditions:\n          .: {}\n          k:{\"type\":\"Available\"}:\n            .: {}\n            f:lastTransitionTime: {}\n            f:lastUpdateTime: {}\n            f:message: {}\n            f:reason: {}\n            f:status: {}\n            f:type: {}\n          k:{\"type\":\"Progressing\"}:\n            .: {}\n            f:lastTransitionTime: {}\n            f:lastUpdateTime: {}\n            f:message: {}\n            f:reason: {}\n            f:status: {}\n            f:type: {}\n        f:observedGeneration: {}\n        f:replicas: {}\n        f:unavailableReplicas: {}\n        f:updatedReplicas: {}\n    manager: kube-controller-manager\n    operation: Update\n    subresource: status\n    time: '2025-05-11T21:14:31+00:00'\n  name: mongodb\n  namespace: default\n  resourceVersion: '18083'\n  uid: 32be953f-3dea-4f30-af66-a55c72de8231\nspec:\n  progressDeadlineSeconds: 600\n  replicas: 1\n  revisionHistoryLimit: 10\n  selector:\n    matchLabels:\n      app: mongodb\n  strategy:\n    rollingUpdate:\n      maxSurge: 25%\n      maxUnavailable: 25%\n    type: RollingUpdate\n  template:\n    metadata:\n      labels:\n        app: mongodb\n    spec:\n      containers:\n      - env:\n        - name: MONGO_INITDB_ROOT_USERNAME\n          valueFrom:\n            secretKeyRef:\n              key: username\n              name: mongodb-secrets\n        - name: MONGO_INITDB_ROOT_PASSWORD\n          valueFrom:\n            secretKeyRef:\n              key: password\n              name: mongodb-secrets\n        image: mongo:latest\n        imagePullPolicy: Always\n        name: mongodb\n        ports:\n        - containerPort: 27017\n          protocol: TCP\n        resources: {}\n        terminationMessagePath: /dev/termination-log\n        terminationMessagePolicy: File\n        volumeMounts:\n        - mountPath: /data/db\n          name: mongodb-data\n      dnsPolicy: ClusterFirst\n      restartPolicy: Always\n      schedulerName: default-scheduler\n      securityContext: {}\n      terminationGracePeriodSeconds: 30\n      volumes:\n      - name: mongodb-data\n        persistentVolumeClaim:\n          claimName: mongodb-pvc\nstatus:\n  conditions:\n  - lastTransitionTime: '2025-05-11T21:04:30+00:00'\n    lastUpdateTime: '2025-05-11T21:04:30+00:00'\n    message: Deployment does not have minimum availability.\n    reason: MinimumReplicasUnavailable\n    status: 'False'\n    type: Available\n  - lastTransitionTime: '2025-05-11T21:14:31+00:00'\n    lastUpdateTime: '2025-05-11T21:14:31+00:00'\n    message: ReplicaSet \"mongodb-f5764484d\" has timed out progressing.\n    reason: ProgressDeadlineExceeded\n    status: 'False'\n    type: Progressing\n  observedGeneration: 1\n  replicas: 1\n  unavailableReplicas: 1\n  updatedReplicas: 1\n",
                    "events": [{
                        "action": "Scheduling",
                        "count": null,
                        "kind": null,
                        "message": "0/3 nodes are available: persistentvolumeclaim \"mongodb-pvc\" not found. preemption: 0/3 nodes are available: 3 Preemption is not helpful for scheduling.",
                        "reason": "FailedScheduling",
                        "timestamp": "Sun, 11 May 2025 21:04:30 GMT",
                        "type": "Warning"
                    }, {
                        "action": "Scheduling",
                        "count": null,
                        "kind": null,
                        "message": "0/3 nodes are available: pod has unbound immediate PersistentVolumeClaims. preemption: 0/3 nodes are available: 3 Preemption is not helpful for scheduling.",
                        "reason": "FailedScheduling",
                        "timestamp": "Sun, 11 May 2025 21:04:31 GMT",
                        "type": "Warning"
                    }, {
                        "action": null,
                        "count": 125,
                        "kind": null,
                        "message": "Error: secret \"mongodb-secrets\" not found",
                        "reason": "Failed",
                        "timestamp": null,
                        "type": "Warning"
                    }],
                    "logs": null,
                    "name": "mongodb-f5764484d-hsv5r",
                    "namespace": "default",
                    "eventId":1
                }]
            }));
        }
    },
    {
        pattern: '/api/clusters',
        method: 'GET',
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
        pattern: '/api/clusters',
        method: 'POST',
        handle: (req,res) => {
            res.statusCode = 201            
            res.end();
        }
    },
    {
        pattern: '/api/clusters/1',
        method: 'PUT',
        handle: (req,res) => {
            res.statusCode = 204            
            res.end();
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