import { OrganizerEntity } from "../../../objects/entities/oraganizer/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const findOrganizerById = async (id: number): Promise<OrganizerEntity> => {
    const connection: Connection = await getLocallyConnection();

    return await connection.getRepository(OrganizerEntity).findOne(id);
}