import { Connection } from "typeorm";
import { FeedbackEntity } from "../../../objects/entities/feedback/entity";

export const getAverageRatingByTrainingId = async (
  connection: Connection,
  trainingId: number
): Promise<number | null> => {
  const countOfReviewsByTrainingId: FeedbackEntity[] = await connection
    .getRepository(FeedbackEntity)
    .find({
      where: { trainingId, type: 2 },
    });
  const sumOfRaitings: number = countOfReviewsByTrainingId.reduce(
    (acc, cur) => acc + cur.rate,
    0
  );

  return countOfReviewsByTrainingId.length
    ? sumOfRaitings / countOfReviewsByTrainingId.length
    : null;
};
