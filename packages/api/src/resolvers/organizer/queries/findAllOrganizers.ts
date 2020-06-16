import { OrganizerEntity } from "../../../objects/entities/oraganizer/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const findAllOrganizers = async (
    connection: Connection
): Promise<OrganizerEntity[]> => {

    return await connection.getRepository(OrganizerEntity).find({ order: { id: "ASC" } });
}