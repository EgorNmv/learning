import { UserEntity } from "../../../objects/entities/user/entity";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { Connection } from "typeorm";

export const findAllUsers = async (
    connection: Connection
): Promise<UserEntity[]> => {

    return await connection.getRepository(UserEntity).find({
        relations: ["role"],
        order: { id: "ASC" }
    });
}