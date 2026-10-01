import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';
import { signToken } from '../middleware/auth.js';
import { HttpError } from '../utils/httpError.js';
import { t } from '../i18n/index.js';

const BCRYPT_ROUNDS = 10;
// Compared against when the email is unknown, so response time does not reveal which emails exist.
const DUMMY_HASH = bcrypt.hashSync('dummy-password-for-timing', BCRYPT_ROUNDS);

export const register = async (req, res) => {
  const { name, email, phone, gender, birthDate, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  if (await User.findOne({ where: { email: normalizedEmail } })) {
    throw new HttpError(409, 'errors.emailTaken');
  }

  const user = await User.create({
    name,
    email: normalizedEmail,
    phone,
    gender,
    birthDate,
    password: await bcrypt.hash(password, BCRYPT_ROUNDS),
  });

  res.status(201).json({ token: signToken(user), user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.scope('withPassword').findOne({ where: { email: email.toLowerCase() } });
  const valid = await bcrypt.compare(password, user ? user.password : DUMMY_HASH);

  if (!user || !valid) {
    throw new HttpError(401, 'errors.invalidCredentials');
  }

  res.json({ token: signToken(user), user });
};

export const me = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (!user) throw new HttpError(404, 'errors.userNotFound');
  res.json({ user });
};

// Email delivery is not configured yet; always answer the same way so the endpoint does not leak which emails exist.
export const forgotPassword = async (req, res) => {
  res.json({ message: t(req.lang, 'auth.forgotPassword') });
};
