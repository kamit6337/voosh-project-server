import { randomBytes } from "crypto";

const generateHexCode = (length) => {
  return randomBytes(length).toString("hex");
};

const hex32 = generateHexCode(32);
console.log("32-character hex code:", hex32);

const hex16 = generateHexCode(16);
console.log("16-character hex code:", hex16);
