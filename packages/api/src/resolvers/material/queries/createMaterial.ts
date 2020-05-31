import { MaterialEntity } from "../../../objects/entities/material/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { InputMaterial } from "../../../objects/input-objects/inputMaterial";
import { findMaterialById } from "./findMaterialById";

export const createMaterial = async (
    connection: Connection,
    data: InputMaterial
): Promise<MaterialEntity> => {
    const { id }: MaterialEntity = await connection.getRepository(MaterialEntity)
        .save({ ...data });
    const newMaterial: MaterialEntity = await findMaterialById(connection, id);

    return newMaterial;
}