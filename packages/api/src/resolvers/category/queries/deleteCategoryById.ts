import { Connection } from "typeorm"
import { CategoryEntity } from "../../../objects/entities/category/entity";
import { findCategoryById } from "./findCategoryById";

export const deleteCategoryById = async (
    connection: Connection,
    id: number
): Promise<boolean> => {
    const category: CategoryEntity = await findCategoryById(connection, id);
    let isCategoryRemoved: boolean = false;

    if (!category) {
        throw new Error(`Category with id ${id} not found`);
    }

    try {
        await connection.getRepository(CategoryEntity).remove(category);
        isCategoryRemoved = true;
    } catch (error) {
        console.info(`Error in deleteCategoryById: ${error}`);
    }

    return isCategoryRemoved;

}