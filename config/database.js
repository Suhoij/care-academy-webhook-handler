module.exports = {
	"development": {
		"username"  : "postgres",
		"password"  : 'b#^sVR|4G7)L',
		"database"  : "care_academy_webhooks",
		"host"      : "webhooks-data.crncqh6y9gfh.us-east-1.rds.amazonaws.com",
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
