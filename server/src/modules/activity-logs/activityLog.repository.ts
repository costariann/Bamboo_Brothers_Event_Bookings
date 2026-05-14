import { prisma } from '../../config/prisma';
import { Prisma } from '../../generated/prisma/client';

export const createActivityLog = async (
  data: Prisma.ActivityLogCreateInput,
) => {
  return prisma.activityLog.create({
    data,
  });
};
