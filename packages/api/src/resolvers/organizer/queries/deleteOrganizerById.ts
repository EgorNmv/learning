import { OrganizerEntity } from "../../../objects/entities/oraganizer/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { findOrganizerById } from "./findOrganizerById";

export const deleteOrganizerById = async (id: number): Promise<boolean> => {
    const connection: Connection = await getLocallyConnection();
    const organizer: OrganizerEntity = await findOrganizerById(id);
    let isOrganizerRemoved: boolean = false;

    if (!organizer) {
        throw new Error(`Organizer with id: ${id} not found`);
    }

    try {
        await connection.getRepository(OrganizerEntity).remove(organizer);
        isOrganizerRemoved = true;
    } catch (error) {
        console.info(`Error in deleteOrganizerById: ${error}`);
    }

    return isOrganizerRemoved;

}