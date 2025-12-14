# Terraform Deployment for MW Poke App

## Prerequisites

1. **Vercel API Token**
2. **AWS Credentials**
4. **GitHub Repository**

## Envs Setup

### 1. Set Environment Variables

```bash
export VERCEL_API_TOKEN=""
export AWS_ACCESS_KEY_ID=""
export AWS_SECRET_ACCESS_KEY=""
```

## Vercel Setup

```bash
Go to Vercel console and link Github acc where the respository is stored
```

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

The server will need `@vendia/serverless-express` for Lambda:

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

- `server_api_endpoint`
- `server_lambda_function`
- `client_deployment_url`

## Updating

```bash
terraform apply
```