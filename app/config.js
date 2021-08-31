require("dotenv").config();

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: process.env.DB_CONTAINER,
    port: process.env.DB_PORT,
    user: process.env.MYSQL_ROOT_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: "coffee",
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
  },
};
  
module.exports = config;