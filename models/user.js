import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

import sequelize from '../config/db';

const User = sequelize.define('User', {
  _uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },

  casino_code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    comment: '娛樂城代碼',
    defaultValue: 'casino_demo_1',
  },

  email: {
    type: DataTypes.STRING,
    validate: { isEmail: true },
    unique: true,
  },

  token: {
    type: DataTypes.STRING,
  },

  tokenCreatedAt: {
    type: DataTypes.DATE,
  },

  tokenExpiresAt: {
    type: DataTypes.DATE,
  },
});

// Adding an instance methods.
User.prototype.validPassword = async (password, hasPassword) => {
  const result = await bcrypt.compare(password, hasPassword);
  return result;
};

User.prototype.generateHash = async password => {
  const result = await bcrypt.hash(password, 10);
  return result;
};

export default User;

//** instance usage */
//   User.prototype.tetFun = function (password) {
//     console.log('test...');
//   };
//
//   User.prototype.tetFun();
