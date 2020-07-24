import { Connection } from "typeorm";
import { FormatEntity } from "../../../objects/entities/format/entity";
import { findFormatById } from "./findFormatById";
import { TrainingEntity } from "../../../objects/entities/training/entity";
import { deleteTrainingById } from "../../training/queries/deleteTrainingById";

export const deleteFormatById = async (
  connection: Connection,
  id: number
): Promise<boolean> => {
  const format: FormatEntity = await findFormatById(connection, id);
  let isFormatRemoved: boolean = false;

  if (!format) {
    throw new Error(`Format with id ${id} not found`);
  }

  try {
    const formatId: number = format.id;
    const trainingsWithFormat: TrainingEntity[] = await connection
      .getRepository(TrainingEntity)
      .find({ where: { formatId } });

    trainingsWithFormat.forEach((training) =>
      deleteTrainingById(connection, training.id)
    );
    await connection.getRepository(FormatEntity).softRemove(format);

    isFormatRemoved = true;
  } catch (error) {
    console.info(`Error in deleteFormatById: ${error}`);
  }

  return isFormatRemoved;
};
