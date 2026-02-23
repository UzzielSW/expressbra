// This example is for Node.js version ( 14.6 or later versions )

require("dotenv").config();
const oracledb = require('oracledb');
// If THICK mode is needed, uncomment the following line.
// oracledb.initOracleClient();

// If you want to connect using your wallet, uncomment the following line.
// process.env.TNS_ADMIN = "/Users/test/wallet_dbname/";

async function runApp() {
  console.log("executing runApp");
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  // If you want to connect using your wallet, comment the following line.
  // const connectString = '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.us-ashburn-1.oraclecloud.com))(connect_data=(service_name=g3118f8f7acf7ce_pe_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))';
  /*
  * If you want to connect using your wallet, uncomment the following line.
  * dbname - is the TNS alias present in tnsnames.ora dbname
  */
  const connectString = process.env.DB_CONNECT_STRING;
  let connection;
  try {
    connection = await oracledb.getConnection({
      user,
      password,
      connectString,
      // If you want to connect using your wallet, uncomment the following lines.
      configDir: process.env.TNS_ADMIN,
      walletLocation: process.env.TNS_ADMIN,
      walletPassword: process.env.WALLET_PASSWORD
    });
    console.log("Successfully connected to Oracle Databas");
    const result = await connection.execute("select * from dual");
    console.log("Query rows", result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

runApp();