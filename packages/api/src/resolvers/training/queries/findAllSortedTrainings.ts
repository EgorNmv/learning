import { Connection, In } from "typeorm";
import { TrainingEntity } from "../../../objects/entities/training/entity";
import { FeedbackEntity } from "../../../objects/entities/feedback/entity";

export const findAllSortedTrainings = async (
  connection: Connection,
  sortBy: "name" | "createDate" | "recommends",
  sortOrder: "ASC" | "DESC"
): Promise<TrainingEntity[]> => {
  if (sortBy === "recommends") {
    const trainingIdsWithRecommends: FeedbackEntity[] = await connection
      .getRepository(FeedbackEntity)
      .find({ select: ["trainingId"] });
    const trainingIdsWithCountOfFeedbacks: {
      [trainigId: string]: number;
    } = trainingIdsWithRecommends.reduce((acc, cur) => {
      if (acc[`${cur.trainingId}`]) {
        acc[`${cur.trainingId}`] += 1;

        return acc;
      } else {
        acc[`${cur.trainingId}`] = 1;

        return acc;
      }
    }, {});
    const sortedListOfIds: string[] = Object.keys(
      trainingIdsWithCountOfFeedbacks
    ).sort((a, b) => {
      if (sortOrder === "ASC") {
        return (
          trainingIdsWithCountOfFeedbacks[a] -
          trainingIdsWithCountOfFeedbacks[b]
        );
      } else {
        return (
          trainingIdsWithCountOfFeedbacks[b] -
          trainingIdsWithCountOfFeedbacks[a]
        );
      }
    });
    const trainings: TrainingEntity[] = await connection
      .getRepository(TrainingEntity)
      .find({
        relations: ["format", "organizer", "audience", "category"],
        where: { id: In([...sortedListOfIds]) },
      });
    const sortedObjectOfIds: {
      [trainingId: string]: number;
    } = sortedListOfIds.reduce((acc, cur, index) => {
      acc[`${cur}`] = index;
      return acc;
    }, {});
    const sortedTrainingByFeedbacks: TrainingEntity[] = trainings.sort(
      (a, b) => sortedObjectOfIds[a.id] - sortedObjectOfIds[b.id]
    );

    return sortedTrainingByFeedbacks;
  } else {
    const trainings: TrainingEntity[] = await connection
      .getRepository(TrainingEntity)
      .find({
        relations: ["format", "organizer", "audience", "category"],
        order: { [sortBy]: sortOrder },
      });

    return trainings;
  }
};
