import { OrganizerEntity } from "../../../objects/entities/oraganizer/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { findOrganizerById } from "./findOrganizerById";
import { InputOrganizer } from "../../../objects/input-objects/inputOrganizer";

export const updateOrganizerById = async (id: number, data: InputOrganizer): Promise<OrganizerEntity> => {
    const connection: Connection = await getLocallyConnection();
    const organizer: OrganizerEntity = await findOrganizerById(id);

    if (!organizer) {
        throw new Error(`Organizer with id: ${id} not found`);
    }

    const updatedOrganizer: OrganizerEntity = await connection.getRepository(OrganizerEntity)
        .save({ ...organizer, ...data });

    return updatedOrganizer;
}