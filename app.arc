@app
eucrona-cloud

@http
/*
  method any
  src server

@static

@aws
profile default
region us-east-1
runtime nodejs16.x
storage 5120
memory 2048
policies
  architect-default-policies
  AmazonSESFullAccess
  AmazonDynamoDBFullAccess


