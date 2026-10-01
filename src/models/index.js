import { sequelize } from '../config/db.js';
import { User } from './User.js';
import { Psychologist } from './Psychologist.js';
import { Session } from './Session.js';

User.hasMany(Session, { foreignKey: 'userId', onDelete: 'CASCADE' });
Session.belongsTo(User, { foreignKey: 'userId' });

Psychologist.hasMany(Session, { foreignKey: 'psychologistId', onDelete: 'CASCADE' });
Session.belongsTo(Psychologist, { foreignKey: 'psychologistId' });

export { sequelize, User, Psychologist, Session };
