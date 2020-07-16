import { OrganizerEntity } from "../../../objects/entities/oraganizer/entity";
import { Connection } from "typeorm";

export const findAllOrganizers = async (
  connection: Connection
): Promise<OrganizerEntity[]> => {
  return await connection
    .getRepository(OrganizerEntity)
    .find({ order: { id: "ASC" } });
};
