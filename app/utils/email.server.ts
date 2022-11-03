import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

import type {
  SendEmailCommandOutput,
  SendEmailCommandInput,
} from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: "us-east-1" });

const ses = {
  sendEmail: async function (params: SendEmailCommandInput) {
    let data: SendEmailCommandOutput | undefined;

    data = await sesClient.send(new SendEmailCommand(params));

    return data;
  },
};

export { ses };
