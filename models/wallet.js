import { DataTypes } from 'sequelize';

import sequelize from '../config/db';

const Wallet = sequelize.define('Wallet', {
  _uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
  },

  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    comment: '玩家代碼',
  },

  casino_code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    comment: '娛樂城代碼',
  },

  wallet_money: {
    type: DataTypes.DOUBLE(12, 2),
    allowNull: false,
    comment: '錢包內的所有金額(包含Freeze_money)',
    defaultValue: 10000,
  },

  freeze_money: {
    type: DataTypes.DOUBLE(12, 2),
    allowNull: false,
    comment: '放在遊戲機內暫時無法使用的金額',
  },

  wallet_status: {
    type: DataTypes.STRING,
    comment: '0:在錢包中 1:在遊戲機中',
  },
});

export default Wallet;
