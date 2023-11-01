// awsRequestHelper.ts

import axios from 'axios';
import { aws4Interceptor } from 'aws4-axios';

/**
 * utils for aws request
 * @param region aws region
 * @param service aws service, for API gateway, use 'execute-api'
 * @param accessKeyId IAM user access key id
 * @param secretAccessKey IAM user secret access key
 */
export function createAWSRequestClient(
  region: string = 'ap-southeast-2',
  service: string = 'execute-api',
  accessKeyId: string,
  secretAccessKey: string,
) {
  const client = axios.create();

  client.interceptors.request.use(
    aws4Interceptor({
      options: {
        region: region,
        service: service,
      },
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    })
  );

  return client;
}
