const path = require('path');

const client = process.env.DB_CLIENT || 'sqlite3';
const defaultDbFilename = path.join(__dirname, 'src', 'database', 'dev.sqlite3');
const isSqlite = client === 'sqlite3';

module.exports = {
  client,
  connection: isSqlite
    ? {
        filename: process.env.DB_SQLITE_FILENAME || defaultDbFilename,
      }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_NAME,
        ssl:
          process.env.DB_USE_SSL === 'true'
            ? { rejectUnauthorized: false }
            : false,
      },
  useNullAsDefault: isSqlite || process.env.DB_USE_NULL_AS_DEFAULT === 'true',
  migrations: {
    directory: path.join(__dirname, 'src', 'database', 'migrations'),
    extension: 'ts',
  },
  seeds: {
    directory: path.join(__dirname, 'src', 'database', 'seeds'),
    extension: 'ts',
  },
};
