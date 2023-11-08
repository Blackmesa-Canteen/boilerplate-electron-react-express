import { app } from 'electron';
import Datastore from '@seald-io/nedb';

/**
 * Database instance
 * @author 996Worker
 * Electron provides various paths that you can retrieve using the app.getPath
 * method. For user data (like configurations), the 'userData' path is most
 * appropriate. This directory will be:
 *
 * On macOS: ~/Library/Application Support/YourAppName
 * On Windows: C:\Users\YourUsername\AppData\Local\YourAppName
 * On Linux: ~/.config/YourAppName
 */
const dbPath = app.getPath('userData');
const usersDb = new Datastore({
  filename: `${dbPath}/users.db`,
  autoload: true,
});

export default {
  usersDb,
  // ... export other databases as needed
};
