terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 1.0"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.0"
    }
  }
}

provider "vercel" {}

provider "aws" {
  region = var.aws_region
}

# SERVER

# Zip generation
data "archive_file" "server_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../server"
  output_path = "${path.module}/server-lambda.zip"
  excludes    = ["node_modules", ".git", "*.md"]
}

# IAM Role
resource "aws_iam_role" "lambda_role" {
  name = "mw-poke-app-server-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Lambda setup
resource "aws_lambda_function" "server" {
  filename         = data.archive_file.server_zip.output_path
  function_name    = "mw-poke-app-server"
  role            = aws_iam_role.lambda_role.arn
  handler         = "src/lambda.handler"
  source_code_hash = data.archive_file.server_zip.output_base64sha256
  runtime         = "nodejs20.x"
  timeout         = 30
  memory_size     = 512

  environment {
    variables = {
      NODE_ENV = "production"
    }
  }
}

# Lambda Function URL
resource "aws_lambda_function_url" "server_url" {
  function_name      = aws_lambda_function.server.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["*"]
    allow_headers     = ["*"]
    max_age          = 86400
  }
}

# CLIENT
resource "vercel_project" "client" {
  name      = "mw-poke-app-client"
  framework = "nextjs"

  git_repository = {
    type = "github"
    repo = var.github_repo
  }

  root_directory = "client"

  environment = [
    {
      key    = "NEXT_PUBLIC_API_URL"
      value  = aws_lambda_function_url.server_url.function_url
      target = ["production", "preview", "development"]
    }
  ]

  depends_on = [
    aws_lambda_function.server,
    aws_lambda_function_url.server_url
  ]
}

resource "vercel_deployment" "client_production" {
  project_id = vercel_project.client.id
  production = true
  ref        = var.git_branch

  depends_on = [
    aws_lambda_function.server,
    aws_lambda_function_url.server_url
  ]
}
