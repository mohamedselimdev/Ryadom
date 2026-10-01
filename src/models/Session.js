import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const SESSION_STATUSES = ['pending', 'confirmed', 'cancelled', 'completed'];

export const Session = sequelize.define('Session', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  psychologistId: { type: DataTypes.INTEGER, allowNull: false },
  startsAt: { type: DataTypes.DATE, allowNull: false },
  format: { type: DataTypes.ENUM('video', 'audio', 'chat'), allowNull: false, defaultValue: 'video' },
  note: { type: DataTypes.STRING(500) },
  status: { type: DataTypes.ENUM(...SESSION_STATUSES), allowNull: false, defaultValue: 'pending' },
});
