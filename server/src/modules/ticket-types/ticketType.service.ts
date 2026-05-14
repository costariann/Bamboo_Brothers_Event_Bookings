import { Prisma } from '../../generated/prisma/client';
import * as repository from './ticketType.repository';

export const createTicketTypeService = async (
  data: Prisma.TicketTypeCreateInput,
) => {
  return repository.createTicketType(data);
};

export const getTicketTypesByEventService = async (eventId: string) => {
  return repository.getTicketTypesByEvent(eventId);
};
export const getTicketTypesService = async () => {
  return repository.getTicketTypes();
};
