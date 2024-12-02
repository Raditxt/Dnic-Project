require('dotenv').config(); // Memuat file .env

module.exports = {
    development: {
        username: process.env.DB_USER || 'default_user',
        password: process.env.DB_PASSWORD || 'default_password',
        database: process.env.DB_NAME || 'default_database',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
    },
    test: {
        username: process.env.DB_USER || 'default_user',
        password: process.env.DB_PASSWORD || 'default_password',
        database: process.env.DB_NAME || 'default_database',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
    },
    production: {
        username: process.env.DB_USER || 'default_user',
        password: process.env.DB_PASSWORD || 'default_password',
        database: process.env.DB_NAME || 'default_database',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
    },
};
