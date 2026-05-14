import { findAdminByEmail } from '../admin/admin.repository';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../../config/env';
import { AppError } from '../../utils/AppError';
export const loginService = async (email: string, password: string) => {
  const admin = await findAdminByEmail(email);

  if (!admin) {
    throw new AppError('Invalid credentials', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign(
    {
      id: admin.id,
      role: admin.role,
      email: admin.email,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'] },
  );

  const { passwordHash, ...safeAdmin } = admin;

  return {
    admin: safeAdmin,
    token,
  };
};
