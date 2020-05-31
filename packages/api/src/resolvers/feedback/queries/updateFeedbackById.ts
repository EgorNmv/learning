import { FeedbackEntity } from "../../../objects/entities/feedback/entity";
import { InputFeedback } from "../../../objects/input-objects/inputFeedback";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { findFeedbackById } from "./findFeedbackById";

export const updateFeedbackById = async (
    connection: Connection,
    id: number,
    data: Partial<InputFeedback>
): Promise<FeedbackEntity> => {
    const feedback: FeedbackEntity = await findFeedbackById(connection, id);

    if (!feedback) {
        throw new Error(`Feedback with id ${id} not found`);
    }

    const updatedFeedback: FeedbackEntity = await connection.getRepository(FeedbackEntity)
        .save({ ...feedback, ...data });

    return updatedFeedback;
}