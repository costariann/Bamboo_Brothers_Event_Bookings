import { io } from '../..';
import { Prisma } from '../../generated/prisma/client';
import * as repository from './activityLog.repository';

export const logActivity = async (data: Prisma.ActivityLogCreateInput) => {
  const activity = await repository.createActivityLog(data);

  io.emit('activity created', activity);

  return activity;
};
