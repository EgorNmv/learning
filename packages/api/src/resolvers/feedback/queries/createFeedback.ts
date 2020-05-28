import { FeedbackEntity } from "../../../objects/entities/feedback/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { InputFeedback } from "../../../objects/input-objects/inputFeedback";
import { findFeedbackById } from "./findFeedbackById";

export const createFeedback = async (data: InputFeedback): Promise<FeedbackEntity> => {
    const connection: Connection = await getLocallyConnection();
    const { id }: FeedbackEntity = await connection.getRepository(FeedbackEntity)
        .save({ ...data });
    const newFeedback: FeedbackEntity = await findFeedbackById(id);

    return newFeedback;
}