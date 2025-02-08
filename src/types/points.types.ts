import { Static, Type } from '@sinclair/typebox';
import { UserTypeBox } from './user.types';

export const PointsTypeBox = Type.Object({
  id: Type.Number(),
  user: UserTypeBox,
  userID: Type.Number(),
  eventID: Type.Number(),
  pointsEarned: Type.Number(),
  source: Type.String(),
  timestamp: Type.String(),
});

export const CreatePointsBody = Type.Pick(PointsTypeBox, [
  'userID',
  'eventID',
  'pointsEarned',
]);

export const GetPointsParams = Type.Pick(PointsTypeBox, ['userID']);

export type PointsType = Static<typeof PointsTypeBox>;
export type CreatePointsBodyType = Static<typeof CreatePointsBody>;
export type GetPointsParamsType = Static<typeof GetPointsParams>;
