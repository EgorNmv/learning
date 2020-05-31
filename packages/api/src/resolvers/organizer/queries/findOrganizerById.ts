import { OrganizerEntity } from "../../../objects/entities/oraganizer/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const findOrganizerById = async (
    connection: Connection,
    id: number
): Promise<OrganizerEntity | null> => {
    const organizer: OrganizerEntity = await connection.getRepository(OrganizerEntity).findOne(id);

    if (!organizer) {
        return null;
    }

    return organizer;
}