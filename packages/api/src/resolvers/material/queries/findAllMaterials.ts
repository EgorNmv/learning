import { MaterialEntity } from "../../../objects/entities/material/entity";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { Connection } from "typeorm";

export const findAllMaterials = async (
    connection: Connection
): Promise<MaterialEntity[]> => {

    return await connection.getRepository(MaterialEntity).find({
        relations: ["training", "training.format", "training.organizer", "training.audience"],
        order: { id: "ASC" }
    });
}