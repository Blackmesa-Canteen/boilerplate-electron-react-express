import userModel from '../models/userModel';

/**
 * Get all users
 */
export const getAllUsers = async (): Promise<any> => {
  return userModel.getAllUsers();
};

/**
 * Insert a new user
 * @param userData Data of the user to be inserted
 */
export const insertUser = async (userData: any): Promise<any> => {
  return userModel.insertUser(userData);
};
