module.exports = {
	NAME: 'soft blog',
	DB_HOST: 'localhost',
	DB_PORT: 27017,
	DB_NAME: 'softblog',
	SESSION_SECRET: 'softblog',
	SYSPORT: 3000,
	ADMIN: {
		NAME: 'dm',
		EMAIL: 'yangdemo@gmail.com',
		AVATAR: '',
		SITE: ''
	},
	DEFAULT_AVATAR: '',

	RCODES: {
		SUCCESS: 0
		, PARAM_MISSING: 1001
	}
}