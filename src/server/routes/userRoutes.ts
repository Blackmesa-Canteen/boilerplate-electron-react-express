import express from 'express';
import * as userService from '../services/userService';
import { sendResponse } from '../utils/responseHelper';

const router = express.Router();

/**
 * get all users
 * @route GET /api/users
 * @author 996Worker
 */
router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    sendResponse(res, { message: 'Fetched all users', data: users });
  } catch (error) {
    sendResponse(res, { message: 'fetch user error', error: error as Error });
  }
});

/**
 * create a new user
 * @route POST /api/users
 * @param {string} name.body.required - user name
 * @param {string} email.body.required - user email
 * @param {string} password.body.required - user password
 * @author 996Worker
 */
router.post('/', async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.insertUser(userData);
    sendResponse(res, { message: 'created user', data: user });
  } catch (error) {
    sendResponse(res, { error: error as Error });
  }
});

export default router;
