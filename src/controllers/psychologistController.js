import { Psychologist } from '../models/index.js';
import { HttpError } from '../utils/httpError.js';

export const listPsychologists = async (req, res) => {
  const psychologists = await Psychologist.findAll({ order: [['id', 'ASC']] });
  res.json({ psychologists });
};

export const getPsychologist = async (req, res) => {
  const psychologist = await Psychologist.findByPk(req.params.id);
  if (!psychologist) throw new HttpError(404, 'errors.psychologistNotFound');
  res.json({ psychologist });
};

export const createPsychologist = async (req, res) => {
  const { name, specialization, experienceYears, schedule, photo, bio, translations } = req.body;
  const psychologist = await Psychologist.create({
    name,
    specialization,
    experienceYears,
    schedule,
    photo,
    bio,
    translations,
  });
  res.status(201).json({ psychologist });
};
