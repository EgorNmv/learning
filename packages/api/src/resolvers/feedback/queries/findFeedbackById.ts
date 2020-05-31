import {FeedbackEntity} from "../../../objects/entities/feedback/entity";
import {Connection} from "typeorm";
import {getLocallyConnection} from "../../../../../core/src/database-connection/database-connection";

export const findFeedbackById = async (
    id: number
): Promise<FeedbackEntity | null> => {
    const connection: Connection = await getLocallyConnection();
    const feedback: FeedbackEntity = await connection.getRepository(FeedbackEntity).findOne({
        where: {id},
        relations: ["user", "training", "training.format", "training.organizer", "training.audience"]
    });

    if (!feedback) {
        return null;
    }

    return feedback;
}