CrashLoopBackOff
Container repeatedly crashes after starting, triggering exponential backoff delays.
ImagePullBackOff
Kubernetes cannot retrieve the container image due to registry issues, authentication errors, or invalid image references.
OOMKilled (Container Limit Reached)
Container exceeds its memory limit and is terminated by the kernel.
FailedScheduling
No nodes available due to resource constraints, taints/tolerations mismatches, or node unavailability.
FailedCreatePodSandbox
Network plugin (CNI) issues prevent pod sandbox creation.
FailedCreatePodContainer
Container creation fails due to misconfigured volumes, security policies, or runtime errors.
ContainerCannotRun
Invalid command/arguments in the pod spec, corrupted image, or missing dependencies.
NodeNotReady
Underlying node becomes unavailable due to kubelet crashes, network partitions, or resource exhaustion.
Liveness/Startup Probe Failures
Health checks fail repeatedly, forcing Kubernetes to restart the container.
Evicted
Node resource pressure (CPU/memory/disk) triggers pod eviction.
FailedMount
Persistent volume claims cannot be mounted due to storage driver issues or access problems[^1^].
DeadlineExceeded
Pod startup exceeds the configured activeDeadlineSeconds[^1^].
Error
Generic error state for undefined failures (check logs for specifics).
FailedPostStartHook
Post-start container hook execution fails[^1^].
FailedPreStopHook
Pre-stop container hook execution fails[^1^].



---- non error

Non-Error Pod Events
Scheduled
Pod successfully assigned to a node for execution.
Pulled
Container image pulled successfully (precedes Created).
Created
Container created (does not guarantee readiness).
Started
Container process began execution.
Healthy
Liveness/readiness probes succeeded (not an official event type, but implied by probe success).
Completed
Container exited with status code 0 (intentional termination).
