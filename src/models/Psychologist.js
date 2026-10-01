import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Psychologist = sequelize.define('Psychologist', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // Default (Russian) values; other languages live in `translations`.
  name: { type: DataTypes.STRING(100), allowNull: false },
  specialization: { type: DataTypes.STRING(100), allowNull: false },
  experienceYears: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  schedule: { type: DataTypes.STRING(100) },
  photo: { type: DataTypes.STRING(255) },
  bio: { type: DataTypes.TEXT },
  // { en: { name, specialization, schedule }, ar: { ... } }
  translations: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
});
