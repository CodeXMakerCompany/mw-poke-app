output "server_api_endpoint" {
  description = "Lambda Function URL"
  value       = aws_lambda_function_url.server_url.function_url
}

output "server_lambda_function" {
  description = "Lambda function"
  value       = aws_lambda_function.server.function_name
}

output "client_deployment_url" {
  description = "CLIENT URL"
  value       = vercel_deployment.client_production.url
}