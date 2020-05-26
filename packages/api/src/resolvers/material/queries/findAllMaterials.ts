import { MaterialEntity } from "../../../objects/entities/material/entity";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const findAllMaterials = async (): Promise<MaterialEntity[]> => {
    const connection = await getLocallyConnection();

    return await connection.getRepository(MaterialEntity).find();
}