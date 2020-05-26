import { UserEntity } from "../../../objects/entities/user/entity";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { Connection } from "typeorm";

export const findUserById = async (id: number): Promise<UserEntity> => {
    const connection: Connection = await getLocallyConnection();

    return await connection.getRepository(UserEntity).findOne(id);
}