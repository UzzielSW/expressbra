// require("dotenv").config();
// const { getConnection } = require("./db");

// async function main() {
//   let connection;

//   try {
//     connection = await getConnection();

//     const result = await connection.execute("SELECT sysdate FROM dual");
//     console.log("Query rows:", result.rows);

//   } catch (err) {
//     console.error(err);
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   }
// }

// main();
//
//
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
