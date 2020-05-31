import { TrainingEntity } from "../../../objects/entities/training/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const findAllTrainings = async (
    connection: Connection
): Promise<TrainingEntity[]> => {

    return await connection.getRepository(TrainingEntity).find({
        relations: ["format", "organizer", "audience"]
    });
}