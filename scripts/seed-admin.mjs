// Crea (o actualiza) el usuario administrador en la base de datos.
//
// Uso:
//   node --env-file=.env.local scripts/seed-admin.mjs [email] [password] [nombre]
//
// Si no se pasan argumentos, usa los valores por defecto de abajo.

import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

async function main() {
  const email = process.argv[2] || "admin@xpresso.com";
  const password = process.argv[3] || "Admin1234!";
  const nombre = process.argv[4] || "Administrador";

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "cafeteria_xpresso",
  });

  const hash = await bcrypt.hash(password, 10);

  await connection.execute(
    `INSERT INTO usuarios (nombre, email, password_hash, rol)
     VALUES (?, ?, ?, 'admin')
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), rol = 'admin'`,
    [nombre, email, hash]
  );

  console.log(`Usuario admin listo: ${email} / ${password}`);
  console.log("Cambia esta contraseña después de tu primer inicio de sesión.");

  await connection.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("Error creando el admin:", err);
  process.exit(1);
});
