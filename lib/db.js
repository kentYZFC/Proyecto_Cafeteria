import mysql from "mysql2/promise";

// Reutilizamos un único pool de conexiones entre requests
// (en dev, globalThis evita crear un pool nuevo en cada hot-reload).
const globalParaPool = globalThis;

export function getPool() {
  if (!globalParaPool._pool) {
    globalParaPool._pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "cafeteria_xpresso",
      waitForConnections: true,
      connectionLimit: 10,
    });
  }

  return globalParaPool._pool;
}
