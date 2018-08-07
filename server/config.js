const { env: ENV } = process;
module.exports = {
    /**
     * Database configuration settings
     */
    db: {
        database: 'meadowlark',
        user: 'root',
        password: 'root',
        host: 'db',
        port: ENV.DB_PORT || 3306,
        dialect: 'mysql'
    },
    /**
     * Root user configuration settings
     */
    admin: {
        user: 'admin',
        password: 'admin',
        firstName: 'Meadow',
        lastName: 'Lark',
        email: 'admin@grasslands.com'
    },
    /**
     * Server configuration settings
     */
    server: {
        port: ENV.PORT || 9000,
        root: __dirname
    },
    /**
     * Site configuration
     */
    site: {
        title: 'Meadowlark Blog',
        tagline: 'A lightweight microblog'
    }
};
