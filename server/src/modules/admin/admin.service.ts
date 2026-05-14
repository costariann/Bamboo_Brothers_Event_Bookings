import { Prisma } from '../../generated/prisma/client';
import bcrypt from 'bcrypt';
import * as repository from './admin.repository';
import { logActivity } from '../activity-logs/activityLog.service';
import { ACTIVITY_ACTIONS } from '../../constants/activityActions';
import { AppError } from '../../utils/AppError';

export const createAdminService = async (
  data: Prisma.AdminCreateInput & {
    password: string;
  },
  creatorAdminId: string,
) => {
  const existingAdmin = await repository.findAdminByEmail(data.email);

  if (existingAdmin) {
    throw new AppError('Admin already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const admin = await repository.createAdmin({
    name: data.name,
    email: data.email,
    role: data.role,
    passwordHash: hashedPassword,
  });

  await logActivity({
    action: ACTIVITY_ACTIONS.ADMIN_CREATED,
    entityType: 'ADMIN',
    entityId: admin.id,
    description: `Created admin ${admin.email}`,
    admin: {
      connect: {
        id: creatorAdminId,
      },
    },
  });

  return admin;
};

export const getAdminsService = async () => {
  return repository.getAdmins();
};

export const getAdminByIdService = async (id: string) => {
  const admin = await repository.getAdminById({ id });

  if (!admin) {
    throw new AppError('Admin not found', 404);
  }
  return admin;
};
