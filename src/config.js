module.exports = {
	development: {
		isProduction: false,
		port: process.env.PORT,
		app: {
			name: 'Universal React Development'
		}
	},
	production: {
		isProduction: true,
		port: process.env.PORT,
		app: {
			name: 'Universal React Production'
		}
	}
}[process.env.NODE_ENV || 'development'];