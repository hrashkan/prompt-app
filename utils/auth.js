import { hash, compare } from "bcrypt";
import { verify } from "jsonwebtoken";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export function verifyToken(token, secretKey){
  try {
    const result = verify(token, secretKey);
    return result;
  } catch (error) {
    console.log(error)
    return false;
  }
}

