import { TrainingEntity } from "../../../objects/entities/training/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const findAllTrainings = async (): Promise<TrainingEntity[]> => {
    const connection: Connection = await getLocallyConnection();

    return await connection.getRepository(TrainingEntity).find({
        relations: ["format", "organizer", "audience"]
    });
}