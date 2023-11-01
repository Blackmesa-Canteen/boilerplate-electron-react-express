// AWSAppConfigHelper.ts

import { createAWSRequestClient } from './awsRequestHelper';

export class AWSAppConfigHelper {
  private client: ReturnType<typeof createAWSRequestClient>;
  private appId: string;
  private envId: string;

  constructor(accessKeyId: string, secretAccessKey: string, region: string, appId: string, envId: string) {
    this.client = createAWSRequestClient(region, 'appconfig', accessKeyId, secretAccessKey);
    // 'appconfig' is the service name for AWS AppConfig
    this.appId = appId;
    this.envId = envId;
  }

  async fetchConfig(configProfileId: string, clientId: string, configVersion: string) {
    try {
      const response = await this.client.get(
        `/applications/${this.appId}/environments/${this.envId}/configurations/${configProfileId}?client_id=${clientId}&client_configuration_version=${configVersion}`
      );

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to fetch configuration: ' + error.message);
      } else {
        // Handle or throw the error differently, maybe just re-throw it:
        throw error;
      }
    }
  }
}
