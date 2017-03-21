module.exports = {
	"development": {
		"username"  : "",
		"password"  : '',
		"database"  : "",
		"host"      : "",
		"dialect"   : "postgres"
	},
	"production": {
		"host"      : process.env.RDS_HOSTNAME,
		"database"  : process.env.RDS_DB_NAME ,
		"username"  : process.env.RDS_USERNAME,
		"password"  : process.env.RDS_PASSWORD,
		"dialect": 'postgres',
	}
};
