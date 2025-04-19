The error message "0/3 nodes are available: persistentvolumeclaim "mongodb-pvc" not found" clearly indicates that your Kubernetes deployment cannot find the PersistentVolumeClaim (PVC) named `mongodb-pvc`.  This PVC is crucial because your MongoDB deployment's pod requires it to store its data (mounted at `/data/db`). The deployment is failing to start because the necessary storage is not available.

Here's how to troubleshoot and resolve this:

**Solution 1: Create the PersistentVolumeClaim**

This is the most likely solution.  The deployment YAML defines the need for `mongodb-pvc`, but it doesn't create it. You need to create the PVC separately. The specifics depend on your storage setup (e.g., using a local disk, cloud storage, etc.).

##STEP 1: Define the PVC YAML

Create a YAML file (e.g., `mongodb-pvc.yaml`) defining the PVC.  This example assumes you have a StorageClass defined that manages your persistent volumes.  Adjust `storageClassName` and `resources.requests.storage` as needed for your environment.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongodb-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi # Adjust storage size as needed
  storageClassName: <your-storage-class-name> # Replace with your StorageClass name
```

##STEP 2: Create the PVC

Apply the YAML file using `kubectl`:

```bash
kubectl apply -f mongodb-pvc.yaml
```

##STEP 3: Verify PVC Creation

Check that the PVC is created and bound:

```bash
kubectl get pvc mongodb-pvc -n default
```

You should see an `STATUS` of `Bound`. If it's `Pending`, investigate why the PVC isn't binding.  This might involve checking your storage provisioning and StorageClass configuration.


**Solution 2: Check StorageClass**

If the PVC creation fails (remains Pending), ensure that a StorageClass is properly defined and available in your Kubernetes cluster.  StorageClasses define how PVCs are provisioned.

##STEP 1: List Available StorageClasses

```bash
kubectl get storageclass
```

##STEP 2: Create a StorageClass (if needed)

If no suitable StorageClass exists, you'll need to create one. This is highly dependent on your infrastructure.  Consult your cloud provider's documentation or your on-premise storage system's instructions.  Example (replace with your provider's specifics):

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-storage-class
provisioner: <your-provisioner> # e.g., kubernetes.io/gce-pd, k8s.io/aws-ebs
parameters:
  type: <volume-type> # e.g., pd-standard, gp2
```

##STEP 3: Apply the StorageClass

```bash
kubectl apply -f storageclass.yaml
```


**Solution 3: Verify Secret**

The deployment relies on the `mongodb-secrets` secret for authentication.  Ensure this secret exists and contains the `username` and `password` keys.

##STEP 1: Check Secret Existence

```bash
kubectl get secret mongodb-secrets -n default
```

##STEP 2: Create Secret (if needed)

If it doesn't exist, create it:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mongodb-secrets
  namespace: default
stringData:
  username: <your_mongodb_username>
  password: <your_mongodb_password>
```

##STEP 3: Apply the Secret

```bash
kubectl apply -f mongodb-secrets.yaml
```


**Solution 4: Check for Node Issues**

Although the error focuses on the PVC, underlying node problems could indirectly prevent pod scheduling.

##STEP 1: Check Node Status

```bash
kubectl get nodes
```

Look for any nodes with issues (e.g., `NotReady`, `SchedulingDisabled`).  Address any node problems before proceeding.


After implementing the relevant solutions, check the deployment status again:

```bash
kubectl rollout status deployment mongodb -n default
```

If the deployment still fails, examine the pod logs for more specific error messages using:

```bash
kubectl logs <pod-name> -n default
```

Replace `<pod-name>` with the name of the failing pod.  This provides crucial insights into the root cause. Remember to replace placeholders like `<your-storage-class-name>`, `<your-provisioner>`, `<volume-type>`, `<your_mongodb_username>`, and `<your_mongodb_password>` with your actual values.
