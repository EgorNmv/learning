import { FeedbackEntity } from "../../../objects/entities/feedback/entity";
import { Connection } from "typeorm";

export const findFeedbacksByUserId = async (
  connection: Connection,
  userId: string,
  feedbackType: number
): Promise<FeedbackEntity[]> => {
  const feedbacksByUserId: FeedbackEntity[] = await connection
    .getRepository(FeedbackEntity)
    .find({
      relations: [
        "training",
        "training.format",
        "training.organizer",
        "training.audience",
        "training.category",
      ],
      where: { userId, type: feedbackType },
    });

  return feedbacksByUserId;
};
