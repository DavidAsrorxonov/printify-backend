import bcrypt from "bcryptjs";

export const hashVal = async (val: string) => {
  return bcrypt.hash(val, 10);
};

export const verifyVal = async (data: { password: string; hash: string }) => {
  return bcrypt.compare(data.password, data.hash);
};
