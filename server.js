require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;
// Coloca esto en tu `server.js` (antes de las rutas)
app.set('trust proxy', true); // activar si hay proxy/load balancer

// Middleware para recopilar información del cliente
app.use((req, res, next) => {
  const ipsHeader = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.headers['cf-connecting-ip'];
  const ips = req.ips && req.ips.length ? req.ips : (ipsHeader ? ipsHeader.split(',').map(s => s.trim()) : []);
  const ip = req.ip || ips[0] || req.connection?.remoteAddress;

  const info = {
    ip,
    ips,
    method: req.method,
    url: req.originalUrl,
    protocol: req.protocol,
    secure: req.secure,
    host: req.hostname || req.get('Host'),
    userAgent: req.get('User-Agent'),
    referer: req.get('Referer')
    // headers: req.headers
  };

  // Adjuntar al req para usarlo en handlers posteriores
  req.clientInfo = info;

  console.log('clientInfo:', info);
  next();
});

// Ruta de ejemplo que devuelve clientInfo
app.get("/", (req, res) => {
  return res.status(200).send({
    message: "Hello World!",
    clientInfo: req.clientInfo
  });
});

app.listen(port, () => {
  console.log("Listening on " + port);
});

module.exports = app;