import crypto from "crypto";
import { environment } from "../environment.js";

const ENCRYPTION_KEY = environment.ENCRYPTION_KEY;
const ENCRYPTION_IV = environment.ENCRYPTION_IV;

const algorithm = "aes-256-cbc";

if (!ENCRYPTION_KEY || !ENCRYPTION_IV) {
  throw new Error(
    "Encryption key and IV must be defined in environment variables"
  );
}

export const encrypt = (obj) => {
  const objStr = JSON.stringify({ ...obj, iat: Date.now(), exp: Date.now() });

  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(ENCRYPTION_KEY, "hex"),
    Buffer.from(ENCRYPTION_IV, "hex")
  );
  let encrypted = cipher.update(objStr);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
};

export const decrypt = (encryptedText) => {
  try {
    const encryptedBuffer = Buffer.from(encryptedText, "hex");
    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(ENCRYPTION_KEY, "hex"),
      Buffer.from(ENCRYPTION_IV, "hex")
    );
    let decrypted = decipher.update(encryptedBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    const jsonString = decrypted.toString();
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error("Failed to decrypt data");
  }
};
