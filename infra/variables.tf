variable "github_repo" {
  description = "GitHub repository"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "git_branch" {
  description = "Git branch"
  type        = string
  default     = "prod"
}
