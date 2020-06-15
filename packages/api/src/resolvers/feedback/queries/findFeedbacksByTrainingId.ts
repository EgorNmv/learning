import { Connection } from "typeorm";
import { FeedbackEntity } from "../../../objects/entities/feedback/entity";

export const findFeedbacksByTrainingId = async (
    connection: Connection,
    trainingId: number,
    feedbackType: number
): Promise<FeedbackEntity[]> => {
    const feedbacksByTrainingId: FeedbackEntity[] = await connection
        .getRepository(FeedbackEntity)
        .find({
            relations: [
                "user",
                "training",
                "training.format",
                "training.organizer",
                "training.audience"
            ],
            where: { trainingId, type: feedbackType }
        });

    return feedbacksByTrainingId;
}