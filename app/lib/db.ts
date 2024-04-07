const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize({ database: process.env.PGDATABASE, username: process.env.PGUSER, password: process.env.PGPASSWORD, host: process.env.PGHOST, dialect: "postgres", port: process.env.PGPORT });

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
// db.User = require('./models/user')(sequelize, Sequelize);
// Add more models here if needed

module.exports = db;
