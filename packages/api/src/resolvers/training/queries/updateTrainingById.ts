import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { InputTraining } from "../../../objects/input-objects/inputTraining";
import { findTrainingById } from "./findTrainingById";
import { TrainingEntity } from "../../../objects/entities/training/entity";

export const updateTrainingById = async (id: number, data: Partial<InputTraining>): Promise<TrainingEntity> => {
    const connection: Connection = await getLocallyConnection();
    const training: TrainingEntity = await findTrainingById(id);

    if (!training) {
        throw new Error(`Training with id ${id} not found`);
    }

    const updatedTraining: TrainingEntity = await connection.getRepository(TrainingEntity)
        .save({ ...training, ...data });

    return updatedTraining;
}