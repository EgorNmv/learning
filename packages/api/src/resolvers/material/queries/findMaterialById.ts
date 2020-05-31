import { MaterialEntity } from "../../../objects/entities/material/entity";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { Connection } from "typeorm";

export const findMaterialById = async (
    connection: Connection,
    id: number
): Promise<MaterialEntity | null> => {
    const material: MaterialEntity = await connection.getRepository(MaterialEntity).findOne({
        where: { id },
        relations: ["training", "training.format", "training.organizer", "training.audience"]
    });

    if (!material) {
        return null;
    }

    return material;
}