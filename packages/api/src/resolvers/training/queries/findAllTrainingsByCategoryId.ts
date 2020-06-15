import { Connection } from "typeorm";
import { TrainingEntity } from "../../../objects/entities/training/entity";

export const findAllTrainingsByCategoryId = async (
    connection: Connection,
    categoryId: number
): Promise<TrainingEntity[]> => {
    const trainingsByCategoryId: TrainingEntity[] = await connection
        .getRepository(TrainingEntity).find({
            relations: ["format", "organizer", "audience", "category"],
            where: { categoryId }
        });

    return trainingsByCategoryId;
}