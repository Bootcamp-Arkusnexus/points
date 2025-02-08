import { Static, Type } from '@sinclair/typebox';

export const UserTypeBox = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  email: Type.String(),
  isActive: Type.Boolean(),
  profilePicture: Type.Optional(Type.String()),
  coverImage: Type.Optional(Type.String()),
  totalPoints: Type.Number(),
  level: Type.Number(),
  userID: Type.Number(),
  eventID: Type.Number(),
  role: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

export type UserType = Static<typeof UserTypeBox>;
