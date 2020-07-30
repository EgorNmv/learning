import { Connection } from "typeorm";
import { CategoryEntity } from "../../../objects/entities/category/entity";
import { findCategoryById } from "./findCategoryById";
import { TrainingEntity } from "../../../objects/entities/training/entity";
import { deleteTrainingById } from "../../training/queries/deleteTrainingById";

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
    const trainingsWithCategory: TrainingEntity[] = await connection
      .getRepository(TrainingEntity)
      .find({ where: { categoryId } });

    trainingsWithCategory.forEach((training) =>
      deleteTrainingById(connection, training.id)
    );
    await connection.getRepository(CategoryEntity).softRemove(category);

    isCategoryRemoved = true;
  } catch (error) {
    console.info(`Error in deleteCategoryById: ${error}`);
  }

  return isCategoryRemoved;
};
