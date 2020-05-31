import { InputMaterial } from "../../../objects/input-objects/inputMaterial";
import { MaterialEntity } from "../../../objects/entities/material/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { findMaterialById } from "./findMaterialById";

export const updateMaterialById = async (
    connection: Connection,
    id: number,
    data: InputMaterial
): Promise<MaterialEntity> => {
    const material: MaterialEntity = await findMaterialById(connection, id);

    if (!material) {
        throw new Error(`Material with id ${id} not found`);
    }

    const updatedMaterial: MaterialEntity = await connection.getRepository(MaterialEntity)
        .save({ ...material, ...data });

    return updatedMaterial;
}