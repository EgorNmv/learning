import { FeedbackEntity } from "../../../objects/entities/feedback/entity";
import { Connection } from "typeorm";

export const findAllFeedbacks = async (
    connection: Connection
): Promise<FeedbackEntity[]> => {

    return await connection.getRepository(FeedbackEntity).find({
        relations: ["user", "training", "training.format", "training.organizer", "training.audience"],
        order: { id: "ASC" }
    });
}