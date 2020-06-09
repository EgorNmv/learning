import { Connection } from "typeorm";
import { CategoryEntity } from "../../../objects/entities/category/entity";

export const createCategory = async (
    connection: Connection,
    description: string
): Promise<CategoryEntity> => {
    const categoryFromData: CategoryEntity = await connection.getRepository(CategoryEntity)
        .save({ description });

    return categoryFromData;
}