import {TrainingEntity} from "../../../objects/entities/training/entity";
import {Connection} from "typeorm";
import {getLocallyConnection} from "../../../../../core/src/database-connection/database-connection";

export const findTrainingById = async (
    id: number
): Promise<TrainingEntity | null> => {
    const connection: Connection = await getLocallyConnection();
    const training: TrainingEntity = await connection.getRepository(TrainingEntity).findOne({
        where: {id},
        relations: ["format", "organizer", "audience"]
    });

    if (!training) {
        return null;
    }

    return training;
}