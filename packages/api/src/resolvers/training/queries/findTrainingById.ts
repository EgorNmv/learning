import { TrainingEntity } from "../../../objects/entities/training/entity";
import { Connection, createQueryBuilder } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const findTrainingById = async (id: number): Promise<TrainingEntity> => {
    const connection: Connection = await getLocallyConnection();

    return await connection.getRepository(TrainingEntity).findOne({
        where: { id },
        relations: ["format", "organizer", "audience"]
    });
}