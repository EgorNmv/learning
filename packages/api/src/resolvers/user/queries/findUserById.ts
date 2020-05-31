import { UserEntity } from "../../../objects/entities/user/entity";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { Connection } from "typeorm";

export const findUserById = async (
    connection: Connection,
    id: number
): Promise<UserEntity | null> => {
    const user: UserEntity = await connection.getRepository(UserEntity).findOne(id);

    if (!user) {
        return null;
    }

    return user;
}