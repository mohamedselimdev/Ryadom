// `key` is an i18n message key (see src/i18n/messages.js); the error handler translates it for the client.
export class HttpError extends Error {
  constructor(status, key, details) {
    super(key);
    this.status = status;
    this.key = key;
    this.details = details;
  }
}

// Wraps async route handlers so rejected promises reach the error middleware.
export const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
