import { Connection } from "typeorm";
import { CategoryEntity } from "../../../objects/entities/category/entity";
import { findCategoryById } from "./findCategoryById";

export const updateCategoryById = async (
    connection: Connection,
    id: number,
    description: string
): Promise<CategoryEntity> => {
    const category: CategoryEntity = await findCategoryById(connection, id);

    if (!category) {
        throw new Error(`Category with id:${id} not found`);
    }

    const updatedCategory: CategoryEntity = await connection.getRepository(CategoryEntity)
        .save({ ...category, description })

    return updatedCategory;
}