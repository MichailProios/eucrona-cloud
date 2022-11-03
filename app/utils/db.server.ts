import * as dynamoose from "dynamoose";
import type { Item } from "dynamoose/dist/Item";

const ddb = new dynamoose.aws.ddb.DynamoDB({
  region: "us-east-1",
});

dynamoose.aws.ddb.set(ddb);

interface EmailSubscribersProps extends Item {
  EmailAddress: String;
}

const EmailSubscribers = dynamoose.model<EmailSubscribersProps>(
  "EmailSubscribers",
  {
    EmailAddress: String,
  }
);

export { EmailSubscribers, dynamoose };
