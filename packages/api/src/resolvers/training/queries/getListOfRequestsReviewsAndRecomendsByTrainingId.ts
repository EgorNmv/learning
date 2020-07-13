import { Connection } from "typeorm";
import { RequestEntity } from "../../../objects/entities/request/entity";
import { FeedbackEntity } from "../../../objects/entities/feedback/entity";

export const getListOfRequestsReviewsAndRecomendsByTrainingId = async (
  connection: Connection,
  trainingId: number
): Promise<number[]> => {
  const countOfRequestsByTrainingId: [
    RequestEntity[],
    number
  ] = await connection
    .getRepository(RequestEntity)
    .findAndCount({ where: { trainingId } });
  const countOfReviewsByTrainingId: [
    FeedbackEntity[],
    number
  ] = await connection.getRepository(FeedbackEntity).findAndCount({
    where: { trainingId, type: 2 },
  });
  const countofRecomendsByTrainingId: [
    FeedbackEntity[],
    number
  ] = await connection
    .getRepository(FeedbackEntity)
    .findAndCount({ where: { trainingId, type: 1 } });

  return [
    countOfRequestsByTrainingId[1],
    countOfReviewsByTrainingId[1],
    countofRecomendsByTrainingId[1],
  ];
};
