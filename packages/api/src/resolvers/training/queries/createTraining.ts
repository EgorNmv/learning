import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { InputTraining } from "../../../objects/input-objects/inputTraining";
import { TrainingEntity } from "../../../objects/entities/training/entity";
import { findTrainingById } from "./findTrainingById";

export const createTraining = async (data: InputTraining): Promise<TrainingEntity> => {
    const connection: Connection = await getLocallyConnection();
    const { id }: TrainingEntity = await connection.getRepository(TrainingEntity)
        .save({ ...data });
    const newTraining: TrainingEntity = await findTrainingById(id);

    return newTraining;
}