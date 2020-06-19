import { Connection } from "typeorm";
import { CategoryEntity } from "../../../objects/entities/category/entity";

export const createCategory = async (
    connection: Connection,
    description: string,
    label: string
): Promise<CategoryEntity> => {
    const categoryFromData: CategoryEntity = await connection.getRepository(CategoryEntity)
        .save({ description, label });

    return categoryFromData;
}