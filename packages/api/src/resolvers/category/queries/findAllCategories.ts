import { Connection } from "typeorm";
import { CategoryEntity } from "../../../objects/entities/category/entity";

export const findAllCategories = async (
    connection: Connection
): Promise<CategoryEntity[]> => {

    return await connection.getRepository(CategoryEntity).find();
}