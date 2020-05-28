import { Connection } from "typeorm"
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection"
import { findTrainingById } from "./findTrainingById";
import { TrainingEntity } from "../../../objects/entities/training/entity";

export const deleteTrainingById = async (id: number): Promise<boolean> => {
    const connection: Connection = await getLocallyConnection();
    const training: TrainingEntity = await findTrainingById(id);
    let isTrainingRemoved: boolean = false;

    if (!training) {
        throw new Error(`Training with id ${id} not found`);
    }

    try {
        await connection.getRepository(TrainingEntity).remove(training);
        isTrainingRemoved = true;
    } catch (error) {
        console.info(`Error in deleteTrainingById${error}`);
    }

    return isTrainingRemoved;
}