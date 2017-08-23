module.exports = {

	/**
	 * Database configuration settings
	 */
	db: {
		database: 'meadowlark',
		user: 'root',
		password: 'admin',
		host: 'localhost',
		port: '3306',
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
		port: '1337',
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
