import { Connection } from "typeorm"
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection"
import { MaterialEntity } from "../../../objects/entities/material/entity";
import { findMaterialById } from "./findMaterialById";


export const deleteMaterialById = async (
    connection: Connection,
    id: number
): Promise<boolean> => {
    const material: MaterialEntity = await findMaterialById(connection, id);
    let isMaterialRemoved: boolean = false;

    if (!material) {
        throw new Error(`Material with id ${id} not found`);
    }

    try {
        await connection.getRepository(MaterialEntity).remove(material);
        isMaterialRemoved = true;
    } catch (error) {
        console.info(`Error in deleteMaterialById${error}`);
    }

    return isMaterialRemoved;
}