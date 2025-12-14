# Terraform Deployment for MW Poke App

## Prerequisites

1. **Vercel API Token**
2. **AWS Credentials**
4. **GitHub Repository**

## Setup

### 1. Set Environment Variables

```bash
export VERCEL_API_TOKEN=""
export AWS_ACCESS_KEY_ID=""
export AWS_SECRET_ACCESS_KEY=""
```

### 2. Configure Variables

Edit `terraform.tfvars`:
```hcl
github_repo = "username/repo-name"
aws_region  = "us-east-1"
git_branch  = "prod"
```

### 3. Install Server Dependencies

The server needs `@vendia/serverless-express` for Lambda:

```bash
cd ../server
npm install
cd ../infra
```

### 4. Deploy

```bash

terraform init

terraform plan

terraform apply
```

## Outputs

- `server_api_endpoint`: Your backend API URL
- `server_lambda_function`: Lambda function name
- `client_deployment_url`: Your frontend URL

## Updating

```bash
terraform apply
```