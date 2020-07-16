import { FeedbackEntity } from "../../../objects/entities/feedback/entity";
import { Connection } from "typeorm";
import { InputFeedback } from "../../../objects/input-objects/inputFeedback";
import { findFeedbackById } from "./findFeedbackById";

export const createFeedback = async (
  connection: Connection,
  data: InputFeedback
): Promise<FeedbackEntity> => {
  const { id }: FeedbackEntity = await connection
    .getRepository(FeedbackEntity)
    .save({ ...data });
  const newFeedback: FeedbackEntity = await findFeedbackById(connection, id);

  return newFeedback;
};
