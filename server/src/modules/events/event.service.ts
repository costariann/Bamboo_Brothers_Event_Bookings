import { Prisma } from '../../generated/prisma/client';
import * as repository from './event.repository';

export const createEventService = async (data: Prisma.EventCreateInput) => {
  //Business logic goes in here

  return repository.createEvent(data);
};

export const getEventService = async () => {
  //Business logic goes in here
  return repository.getEvents();
};
