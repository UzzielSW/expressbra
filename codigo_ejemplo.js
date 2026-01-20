/*
* This example is for Node.js version ( 14.6 or later versions )
*
* Follow driver installation and setup instructions here:
* https://www.oracle.com/database/technologies/appdev/quickstartnodejs.html
*/

// require("dotenv").config();
const oracledb = require('oracledb');
// If THICK mode is needed, uncomment the following line.
// oracledb.initOracleClient();

// If you want to connect using your wallet, uncomment the following line.
// process.env.TNS_ADMIN = "/Users/test/wallet_dbname/";

async function runApp()
{
  console.log("executing runApp");
  // Replace USER_NAME, PASSWORD with your username and password
  //
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // connectString: process.env.DB_CONNECT_STRING,
  const user = "";
  const password = "";
  // If you want to connect using your wallet, comment the following line.
  const connectString = '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.us-ashburn-1.oraclecloud.com))(connect_data=(service_name=g3118f8f7acf7ce_pe_low.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))';
  /*
  * If you want to connect using your wallet, uncomment the following line.
  * dbname - is the TNS alias present in tnsnames.ora dbname
  */
  // const connectString ="dbname";
  let connection;
  try {
    connection = await oracledb.getConnection({
      user,
      password,
      connectString,
      // If you want to connect using your wallet, uncomment the following lines.
      // configDir: "/Users/test/wallet_dbname/",
      // walletLocation: "/Users/test/wallet_dbname/",
      // walletPassword: "WALLET_PASSWORD"
    });
    console.log("Successfully connected to Oracle Databas");
    const result = await connection.execute("select * from dual");
    console.log("Query rows", result.rows);
  } catch (err) {
    console.error(err);
  } finally {
     if (connection){
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

runApp();