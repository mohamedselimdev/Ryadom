import { Op } from 'sequelize';
import { Psychologist, Session } from '../models/index.js';
import { HttpError } from '../utils/httpError.js';

const SESSION_LENGTH_MS = 60 * 60 * 1000;

export const bookSession = async (req, res) => {
  const { psychologistId, startsAt, format, note } = req.body;
  const start = new Date(startsAt);

  if (start.getTime() < Date.now() + 15 * 60 * 1000) {
    throw new HttpError(400, 'errors.sessionTooSoon');
  }

  const psychologist = await Psychologist.findByPk(psychologistId);
  if (!psychologist) throw new HttpError(404, 'errors.psychologistNotFound');

  const clash = await Session.findOne({
    where: {
      psychologistId: psychologist.id,
      status: { [Op.in]: ['pending', 'confirmed'] },
      startsAt: {
        [Op.gt]: new Date(start.getTime() - SESSION_LENGTH_MS),
        [Op.lt]: new Date(start.getTime() + SESSION_LENGTH_MS),
      },
    },
  });
  if (clash) throw new HttpError(409, 'errors.slotTaken');

  const session = await Session.create({
    userId: req.user.id,
    psychologistId: psychologist.id,
    startsAt: start,
    format,
    note,
  });

  res.status(201).json({ session });
};

export const listMySessions = async (req, res) => {
  const sessions = await Session.findAll({
    where: { userId: req.user.id },
    include: [{ model: Psychologist, attributes: ['id', 'name', 'specialization', 'photo', 'translations'] }],
    order: [['startsAt', 'ASC']],
  });
  res.json({ sessions });
};

export const cancelSession = async (req, res) => {
  const session = await Session.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!session) throw new HttpError(404, 'errors.sessionNotFound');
  if (!['pending', 'confirmed'].includes(session.status)) {
    throw new HttpError(400, 'errors.sessionNotCancellable');
  }

  session.status = 'cancelled';
  await session.save();
  res.json({ session });
};
