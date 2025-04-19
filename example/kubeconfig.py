kubeconfig_example = {
    "apiVersion": "v1",
    "kind": "Config",
    "preferences": {},
    "clusters": [
        {
            "name": "dev-cluster",
            "cluster": {
                "server": "https://api.dev-cluster.example:6443",
                "certificate-authority-data": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSU...",  # Base64-encoded CA cert
                "insecure-skip-tls-verify": False
            }
        }
    ],
    "users": [
        {
            "name": "dev-admin",
            "user": {
                "client-certificate-data": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSU...",  # Base64-encoded client cert
                "client-key-data": "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb3dJQkFBS0NBUUVBd0V6b2RHRjB..."  # Base64-encoded private key
            }
        }
    ],
    "contexts": [
        {
            "name": "dev-context",
            "context": {
                "cluster": "dev-cluster",
                "user": "dev-admin",
                "namespace": "web-app"
            }
        }
    ],
    "current-context": "dev-context"
}