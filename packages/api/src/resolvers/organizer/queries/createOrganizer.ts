import { OrganizerEntity } from "../../../objects/entities/oraganizer/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { InputOrganizer } from "../../../objects/input-objects/inputOrganizer";

export const createOrganizer = async (data: InputOrganizer): Promise<OrganizerEntity> => {
    const connection: Connection = await getLocallyConnection();

    const formatFromData: OrganizerEntity = await connection.getRepository(OrganizerEntity)
        .save(data);

    return formatFromData;
}