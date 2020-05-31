import { OrganizerEntity } from "../../../objects/entities/oraganizer/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { findOrganizerById } from "./findOrganizerById";
import { InputOrganizer } from "../../../objects/input-objects/inputOrganizer";

export const updateOrganizerById = async (
    connection: Connection,
    id: number,
    data: InputOrganizer
): Promise<OrganizerEntity> => {
    const organizer: OrganizerEntity = await findOrganizerById(connection, id);

    if (!organizer) {
        throw new Error(`Organizer with id: ${id} not found`);
    }

    const updatedOrganizer: OrganizerEntity = await connection.getRepository(OrganizerEntity)
        .save({ ...organizer, ...data });

    return updatedOrganizer;
}