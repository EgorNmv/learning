import { TrainingEntity } from "../../../objects/entities/training/entity";
import { Connection } from "typeorm";

export const findAllTrainings = async (
    connection: Connection
): Promise<TrainingEntity[]> => {

    return await connection.getRepository(TrainingEntity).find({
        relations: ["format", "organizer", "audience", "category"],
        order: { id: "ASC" }
    });
}