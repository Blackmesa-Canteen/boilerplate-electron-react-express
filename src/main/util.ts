/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import fs from 'fs';
import { app } from 'electron';
import { AppConfig } from './types';
import logger from './logger';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

const defaultConfig: AppConfig = {
  apiEndpoint: 'http://localhost:4000/api',
};

const configPath = path.join(app.getPath('userData'), 'config.json');

/**
 * Function to save the configuration file
 * @param newConfig
 * @throws if the configuration file is invalid JSON
 * @author 996 Worker
 */
export function saveConfig(newConfig: AppConfig): void {
  fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
}

/**
 * Function to load the configuration file
 * @returns the configuration object
 * @throws if the configuration file is invalid JSON
 * @author 996Worker
 */
export function loadConfig(): AppConfig {
  if (fs.existsSync(configPath)) {
    try {
      return JSON.parse(fs.readFileSync(configPath, 'utf-8')) as AppConfig;
    } catch (error) {
      logger.error('Error reading config file:', error);
      return defaultConfig;
    }
  } else {
    // If the config file doesn't exist, create one with the default config
    logger.info('Config file not found, creating one with default config');
    saveConfig(defaultConfig);
    return defaultConfig;
  }
}

/**
 * function to get a specific configuration key's value
 * @param key configuration key to get
 * @param value new value for the configuration key
 * @returns the value of the configuration key
 * @throws if the configuration key does not exist
 * @author 996worker
 */
export function getConfig(key: keyof AppConfig): any {
  const config = loadConfig();
  return config[key];
}

/**
 * Function to update a specific configuration key's value
 * @param key configuration key to update
 * @param value new value for the configuration key
 * @author 996 Worker
 */
export function updateConfig(key: keyof AppConfig, value: any): void {
  const config = loadConfig();
  config[key] = value;
  saveConfig(config);
}
