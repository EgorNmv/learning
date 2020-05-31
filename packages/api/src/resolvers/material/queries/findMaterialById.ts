import {MaterialEntity} from "../../../objects/entities/material/entity";
import {getLocallyConnection} from "../../../../../core/src/database-connection/database-connection";

export const findMaterialById = async (
    id: number
): Promise<MaterialEntity | null> => {
    const connection = await getLocallyConnection();
    const material: MaterialEntity = await connection.getRepository(MaterialEntity).findOne({
        where: {id},
        relations: ["training", "training.format", "training.organizer", "training.audience"]
    });

    if (!material) {
        return null;
    }

    return material;
}