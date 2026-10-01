import { getLang, t } from './i18n.js';

const TOKEN_KEY = 'ryadom_token';
const USER_KEY = 'ryadom_user';

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: user stays logged out */
  }
}

export const auth = {
  get token() {
    return storageGet(TOKEN_KEY);
  },
  get user() {
    try {
      return JSON.parse(storageGet(USER_KEY));
    } catch {
      return null;
    }
  },
  get isLoggedIn() {
    return Boolean(this.token);
  },
  save({ token, user }) {
    storageSet(TOKEN_KEY, token);
    storageSet(USER_KEY, JSON.stringify(user));
  },
  clear() {
    storageSet(TOKEN_KEY, null);
    storageSet(USER_KEY, null);
  },
};

export class ApiError extends Error {
  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors || {};
  }
}

export async function api(path, { method = 'GET', body } = {}) {
  const headers = { Accept: 'application/json', 'X-Lang': getLang() };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth.token) headers.Authorization = `Bearer ${auth.token}`;

  let res;
  try {
    res = await fetch(`/api${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, t('error.network'));
  }

  const data = await res.json().catch(() => ({}));

  if (res.status === 401 && auth.token) {
    auth.clear();
  }
  if (!res.ok) {
    throw new ApiError(res.status, data.message || t('error.generic'), data.errors);
  }
  return data;
}
