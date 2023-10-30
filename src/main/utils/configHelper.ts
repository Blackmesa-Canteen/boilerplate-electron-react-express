import Store from 'electron-store';

export interface AppConfig {
  apiEndpoint: string;
}

// Define default configuration and optionally schema for data validation
const defaultConfigs: AppConfig = {
  apiEndpoint: 'http://localhost:4000/api',
};

/**
 * `Configstore` is an instance of `electron-store` with the shape of `AppConfig`.
 * It provides methods to set, get, and delete data in a persistent store.
 * The store is a JSON file located in the app's user data directory.
 *
 * Example usages:
 *
 * 1. Save/Update a value:
 *    Configstore.set('apiEndpoint', 'http://new.endpoint.com/api');
 *
 * 2. Get a value:
 *    const apiEndpoint = Configstore.get('apiEndpoint');
 *
 * 3. Get all stored data as an object:
 *    const allData = Configstore.store;
 *
 * 4. Delete a key:
 *    Configstore.delete('apiEndpoint');
 *
 * 5. Check if a key exists:
 *    const hasKey = Configstore.has('apiEndpoint');
 *
 * Note: Default values are used if no data has been set for a specific key.
 *
 * @author Shawn
 */
export const Configstore = new Store<AppConfig>({ defaults: defaultConfigs });

/**
 * Function to save the configuration
 * @param newConfig
 */
export function saveConfig(newConfig: AppConfig): void {
  for (const key in newConfig) {
    if (newConfig.hasOwnProperty(key)) {
      Configstore.set(key, newConfig[key as keyof AppConfig]);
    }
  }
}
