import { Connection } from "typeorm";
import { FormatEntity } from "../../../objects/entities/format/entity";
import { findFormatById } from "./findFormatById";
import { TrainingEntity } from "../../../objects/entities/training/entity";

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
    const trainingWithFormat: TrainingEntity[] = await connection
      .getRepository(TrainingEntity)
      .find({ where: { formatId } });

    await connection
      .getRepository(TrainingEntity)
      .softRemove(trainingWithFormat);
    await connection.getRepository(FormatEntity).softRemove(format);

    isFormatRemoved = true;
  } catch (error) {
    console.info(`Error in deleteFormatById: ${error}`);
  }

  return isFormatRemoved;
};
