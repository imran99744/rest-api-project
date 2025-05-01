# REST API and System Architecture Design Project

## Part A: Develop & Deploy a REST API

### REST API Description

The REST API includes the following endpoints:

1. **`/api/hello`**:

   - Returns the following JSON response:
     ```json
     {
       "hostname": "server1",
       "datetime": "YYMMDDHHmm",
       "version": "version",
       "weather": {
         "dhaka": {
           "temperature": "14",
           "temp_unit": "c"
         }
       }
     }
     ```
   - Fetches real-time weather data for Dhaka from a free third-party weather API.

2. **`/api/health`**:
   - A health check endpoint to verify the API's health.
   - Checks the reachability of the third-party weather API.

### Containerization

- **Dockerfile**: Used to containerize the application, optimized for security and performance.
- **docker-compose.yaml**: Simplifies local development by managing multi-container setups for development environment.

### CI/CD Pipeline

- **GitHub Repository**: The project is version-controlled in a GitHub repository.
- **Pipeline Features**:
  - Triggers on new releases.
  - Builds a Docker image and pushes it to a public Docker registry.
  - Ensures the release version matches the version returned by the `/api/hello` endpoint.
  - Implements zero-downtime deployment.

### Terraform & Kubernetes Setup

- **Terraform**:

  - Modular code to provision a Kubernetes cluster in AWS.
  - Remote backend for state management.

- **Kubernetes**:
  - Manifests for deploying the application, including `deployment.yaml`, `service.yaml`, and `secrets.yaml`.
  - API credentials stored securely as Kubernetes secrets.

## Part B: System Architecture Design

### Cloud Architecture Design

- Designed to scale an e-commerce application to handle millions of requests efficiently.
- Key considerations:
  - **Read and Write APIs**: Optimized for different types of API requests.
  - **Background Job Processing**: Handles large amounts of data asynchronously.
  - **External Systems**: Integrates with external systems for fetching product lists.
  - **Global Traffic**: Supports variable peak hours with a global user base.

## Project Structure

- **docker-compose.yaml**: Configuration for Docker Compose to manage multi-container applications.
- **Dockerfile**: Instructions to build the Docker image for the application.
- **package.json**: Node.js project dependencies and scripts.
- **server.js**: Main application logic for the REST API.
- **k8s/**: Kubernetes manifests for deployment, secrets, and services.
  - `deployment.yaml`: Deployment configuration for the application.
  - `secrets.yaml`: Kubernetes secrets for sensitive data.
  - `service.yaml`: Service configuration for exposing the application.
- **terraform-eks/**: Terraform configuration for provisioning AWS infrastructure.
  - `backend.tf`: Backend configuration for Terraform state.
  - `main.tf`: Main Terraform configuration file.
  - `provider.tf`: Provider configuration for AWS.
  - `terraform.tfvars`: Variable values for Terraform.
  - `variables.tf`: Variable definitions for Terraform.
- **cloud-diagram/**: Contains architecture diagrams and related documentation.

## Setup Instructions

### Prerequisites

- Docker installed on your system.
- Kubernetes CLI (`kubectl`) installed and configured.
- Terraform installed on your system.
- AWS CLI installed and configured with appropriate permissions.

### Steps to Run the Project

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd rest-api-project
   ```

2. **Build the Docker Image**:

   ```bash
   docker build -t nodejs-api:latest .
   ```

3. **Run Locally with Docker Compose**:

   ```bash
   docker-compose up
   ```

4. **Provision Infrastructure with Terraform**:

   - Navigate to the `terraform-eks/` directory:
     ```bash
     cd terraform-eks
     ```
   - Initialize Terraform:
     ```bash
     terraform init
     ```
   - Apply the Terraform configuration:
     ```bash
     terraform apply
     ```

5. **Deploy to Kubernetes**:

   - Navigate to the `k8s/` directory:
     ```bash
     cd ../k8s
     ```
   - Apply the Kubernetes manifests:
     ```bash
     kubectl apply -f deployment.yaml
     kubectl apply -f service.yaml
     kubectl apply -f secrets.yaml
     ```
