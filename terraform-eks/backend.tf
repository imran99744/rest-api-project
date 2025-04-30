terraform {
  backend "s3" {
    bucket = "my-terraform-eks"
    key    = "eks/terraform.tfstate"
    region = "us-east-1"
  }
}