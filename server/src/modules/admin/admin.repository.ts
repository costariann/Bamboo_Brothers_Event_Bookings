import { Prisma } from '../../generated/prisma/client';
import { prisma } from '../../config/prisma';

export const createAdmin = async (data: Prisma.AdminCreateInput) => {
  return prisma.admin.create({ data });
};

export const findAdminByEmail = async (email: string) => {
  return prisma.admin.findUnique({
    where: { email },
  });
};

export const getAdmins = async () => {
  return prisma.admin.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getAdminById = async ({ id }: { id: string }) => {
  return prisma.admin.findUnique({
    where: {
      id,
    },
  });
};
