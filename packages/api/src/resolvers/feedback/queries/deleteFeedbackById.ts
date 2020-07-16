import { Connection } from "typeorm";
import { FeedbackEntity } from "../../../objects/entities/feedback/entity";
import { findFeedbackById } from "./findFeedbackById";

export const deleteFeedbackById = async (
  connection: Connection,
  id: number
): Promise<boolean> => {
  const feedback: FeedbackEntity = await findFeedbackById(connection, id);
  let isFeedbackRemoved: boolean = false;

  if (!feedback) {
    throw new Error(`Feedback with id ${id} not found`);
  }

  try {
    await connection.getRepository(FeedbackEntity).remove(feedback);
    isFeedbackRemoved = true;
  } catch (error) {
    console.info(`Error in deleteFeedbackById${error}`);
  }

  return isFeedbackRemoved;
};
