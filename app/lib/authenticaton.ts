import jwt from "jsonwebtoken";
import { usersList } from "./placeholder-data";
const secreatKey = process.env.JWT_SECRET_KEY

function generateToken(userId: number | string) {
  return jwt.sign({ userId }, secreatKey, { expiresIn: "1h" });
}

type userInfoTypes = {
  email: string, password: number | string, id: number
  | string
}
export default function authenticateUser(email: string, password: string | number) {
  const user = usersList?.find(
    (u: userInfoTypes) => u.email === email && u.password === password
  );
  if (user) {
    return generateToken(user.id);
  }
  return null;
}
