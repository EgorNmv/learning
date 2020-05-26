import { FeedbackEntity } from "../../../objects/entities/feedback/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const findAllFeedbacks = async (): Promise<FeedbackEntity[]> => {
    const connection: Connection = await getLocallyConnection()

    return await connection.getRepository(FeedbackEntity).find();
}