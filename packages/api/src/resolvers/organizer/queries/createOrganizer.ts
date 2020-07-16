import { OrganizerEntity } from "../../../objects/entities/oraganizer/entity";
import { Connection } from "typeorm";
import { InputOrganizer } from "../../../objects/input-objects/inputOrganizer";

export const createOrganizer = async (
  connection: Connection,
  data: InputOrganizer
): Promise<OrganizerEntity> => {
  const formatFromData: OrganizerEntity = await connection
    .getRepository(OrganizerEntity)
    .save(data);

  return formatFromData;
};
