require("dotenv").config();
const { getConnection } = require("./db");
const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
    let connection;

    try {
        connection = await getConnection();

        const result = await connection.execute(
            "SELECT sysdate FROM dual"
        );

        res.json({
            ok: true,
            rows: result.rows
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            error: err.message
        });

    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
