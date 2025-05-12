### secret example
```sh
kubectl create secret generic mongodb-secrets \
  --from-literal=username=admin \
  --from-literal=password=your-strong-password
```