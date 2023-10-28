import database from '../db/database';

const { usersDb } = database;

/**
 * @description Get all users from the database
 * @returns {Promise<any[]>} Promise that resolves to an array of users
 * @throws {Error} Error message string
 * @author 996Worker
 */
const getAllUsers = async (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    usersDb.find({}, (err, docs) => {
      if (err) reject(err);
      else resolve(docs);
    });
  });
};

const insertUser = async (user: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    usersDb.insert(user, (err, newUser) => {
      if (err) reject(err);
      else resolve(newUser);
    });
  });
};

export default {
  getAllUsers,
  insertUser,
};
