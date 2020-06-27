module.exports = {
    development: {
        client: 'pg',
        connection: 'postgresql://localhost/ttr_db'
    },
    test: {
        client: 'pg',
        connection: 'postgresql://localhost/ttr_db'
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    },
}
