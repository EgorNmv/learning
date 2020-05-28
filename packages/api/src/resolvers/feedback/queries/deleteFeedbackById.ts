import { Connection } from "typeorm"
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection"
import { FeedbackEntity } from "../../../objects/entities/feedback/entity";
import { findFeedbackById } from "./findFeedbackById";

export const deleteFeedbackById = async (id: number): Promise<boolean> => {
    const connection: Connection = await getLocallyConnection();
    const feedback: FeedbackEntity = await findFeedbackById(id);
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
}