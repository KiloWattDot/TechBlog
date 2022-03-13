const Sequelize = require('sequelize');
require('dotenv').config();


let sequelize;
const URI = process.env.MYSQL_URL || process.env.JAWSDB_URL || 'mysql://root:dorothy@localhost:3306/techblog_db';

sequelize = new Sequelize(URI)

module.exports = sequelize;