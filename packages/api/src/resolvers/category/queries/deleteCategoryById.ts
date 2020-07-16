import { Connection } from "typeorm";
import { CategoryEntity } from "../../../objects/entities/category/entity";
import { findCategoryById } from "./findCategoryById";
import { TrainingEntity } from "../../../objects/entities/training/entity";

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
    const categoryId: number = category.id;
    const trainingWithCategory: TrainingEntity[] = await connection
      .getRepository(TrainingEntity)
      .find({ where: { categoryId } });

    await connection
      .getRepository(TrainingEntity)
      .softRemove(trainingWithCategory);
    await connection.getRepository(CategoryEntity).softRemove(category);

    isCategoryRemoved = true;
  } catch (error) {
    console.info(`Error in deleteCategoryById: ${error}`);
  }

  return isCategoryRemoved;
};
