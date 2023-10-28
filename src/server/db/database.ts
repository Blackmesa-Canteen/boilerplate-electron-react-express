import { app } from 'electron';
import Datastore from 'nedb';

// Database path (in user's app data directory to persist across app updates)
const dbPath = app.getPath('userData');
const usersDb = new Datastore({
  filename: `${dbPath}/users.db`,
  autoload: true,
});

export default {
  usersDb,
  // ... export other databases as needed
};
