import { ACTIVITY_ACTIONS } from '../../constants/activityActions';
import { Prisma } from '../../generated/prisma/client';
import { logActivity } from '../activity-logs/activityLog.service';
import * as repository from './event.repository';

export const createEventService = async (
  data: Prisma.EventCreateInput,
  adminId?: string,
) => {
  //Business logic goes in here
  const event = await repository.createEvent(data);

  await logActivity({
    action: ACTIVITY_ACTIONS.EVENT_CREATED,
    entityType: 'EVENT',
    entityId: event.id,
    description: `Created event ${event.title}`,

    admin: adminId
      ? {
          connect: {
            id: adminId,
          },
        }
      : undefined,
  });

  return event;
};

export const getEventService = async () => {
  //Business logic goes in here
  return repository.getEvents();
};
