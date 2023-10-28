import database from '../db/database';

const { usersDb } = database;
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
