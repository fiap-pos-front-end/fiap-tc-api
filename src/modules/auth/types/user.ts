import { User } from '@prisma/client';

export type UserNoId = Omit<User, 'id'>;
