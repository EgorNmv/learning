import { Connection } from "typeorm";
import { CategoryEntity } from "../../../objects/entities/category/entity";

export const findCategoryById = async (
    connection: Connection,
    id: number
): Promise<CategoryEntity | null> => {
    const category: CategoryEntity = await connection.getRepository(CategoryEntity).findOne(id);

    if (!category) {
        return null;
    }

    return category;
}