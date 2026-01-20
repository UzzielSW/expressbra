module.exports = {
  apps: [
    {
      name: "expressbra",
      script: "./index.js",
      instances: 1,
      exec_mode: "fork",
      // Las variables de entorno se cargan automáticamente desde .env
      // gracias a dotenv.config() en index.js
      // No es necesario definir credenciales aquí
      env: {
        NODE_ENV: "development",
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5000,
      },
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      autorestart: false,  // Desactivado porque index.js termina después de ejecutar
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
