import { InputTraining } from "../../../objects/input-objects/inputTraining";
import { TrainingEntity } from "../../../objects/entities/training/entity";
import { findTrainingById } from "./findTrainingById";
import { Context } from "../../../objects/context";
import { getUserBySubOrEmail } from "../../okta/queries/getUserBySub";

export const createTraining = async (
  context: Context,
  data: InputTraining
): Promise<TrainingEntity> => {
  const userBySub = await getUserBySubOrEmail(context.validJwt.claims.uid);
  const { id }: TrainingEntity = await context.connection
    .getRepository(TrainingEntity)
    .save({
      ...data,
      creatorUid: context.validJwt.claims.uid,
      creatorName: `${userBySub.profile.firstName} ${userBySub.profile.lastName}`,
    });
  const newTraining: TrainingEntity = await findTrainingById(
    context.connection,
    id
  );

  return newTraining;
};
