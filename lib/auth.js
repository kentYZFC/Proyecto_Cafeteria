import { SignJWT, jwtVerify } from "jose";

// jose funciona tanto en Node como en el runtime Edge (usado por el
// middleware), a diferencia de jsonwebtoken, que solo funciona en Node.
const secreto = new TextEncoder().encode(
  process.env.JWT_SECRET || "cambia-este-secreto-en-produccion"
);

export async function crearToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secreto);
}

export async function verificarToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secreto);
    return payload;
  } catch {
    return null;
  }
}
