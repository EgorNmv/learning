import { OrganizerEntity } from "../../../objects/entities/oraganizer/entity";
import { Connection } from "typeorm";
import { findOrganizerById } from "./findOrganizerById";
import { TrainingEntity } from "../../../objects/entities/training/entity";
import { deleteTrainingById } from "../../training/queries/deleteTrainingById";

export const deleteOrganizerById = async (
  connection: Connection,
  id: number
): Promise<boolean> => {
  const organizer: OrganizerEntity = await findOrganizerById(connection, id);
  let isOrganizerRemoved: boolean = false;

  if (!organizer) {
    throw new Error(`Organizer with id: ${id} not found`);
  }

  try {
    const organizerId: number = organizer.id;
    const trainingsWithOrganizer: TrainingEntity[] = await connection
      .getRepository(TrainingEntity)
      .find({ where: { organizerId } });

    trainingsWithOrganizer.forEach((training) =>
      deleteTrainingById(connection, training.id)
    );
    await connection.getRepository(OrganizerEntity).softRemove(organizer);

    isOrganizerRemoved = true;
  } catch (error) {
    console.info(`Error in deleteOrganizerById: ${error}`);
  }

  return isOrganizerRemoved;
};
