// Cargar dotenv antes de cualquier otra cosa
require("dotenv").config();

// TNS_ADMIN se carga desde .env y debe estar disponible antes de cargar oracledb
// para que el driver pueda usar el wallet
const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function getConnection() {
  let connection;

  try {
    const connectionConfig = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
      // Configuración del wallet (como en codigo_ejemplo.js)
      configDir: process.env.TNS_ADMIN,
      walletLocation: process.env.TNS_ADMIN,
      walletPassword: process.env.WALLET_PASSWORD
    };

    connection = await oracledb.getConnection(connectionConfig);
    console.log("Successfully connected to Oracle Database");

    return connection;
  } catch (err) {
    console.error("Error connecting to Oracle Database:", err);
    throw err;
  }
}

module.exports = { getConnection };