import asyncHandler from 'express-async-handler';
import User from '../models/user';
import generateToken from '../utils/generateToken';
import { v4 as uuidv4 } from 'uuid';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    // 確認帳號是否存在
    const user = await User.findOne({ where: { name } });

    if (!user) {
      res.status(400).json({
        status: 'fail',
        data: {
          message: '沒有此帳號',
        },
      });
      return;
    }

    // 驗證密碼
    const validPassword = await User.prototype.validPassword(password, user.password);

    if (!validPassword) {
      res.status(400).json({
        status: 'fail',
        data: {
          message: '帳號密碼錯誤',
        },
      });
      return;
    }

    res.json({
      status: 'success',
      data: {
        token: user.token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: 'catch error',
    });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Publics
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let uuid = uuidv4();
    const hashPassword = await User.prototype.generateHash(password);

    const user = await User.create({
      _id: uuid,
      name,
      email,
      password: hashPassword,
      token: generateToken(uuid),
    });

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.errors[0].message,
    });
  }
});
