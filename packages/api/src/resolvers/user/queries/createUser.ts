import { UserEntity } from "../../../objects/entities/user/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { InputUser } from "../../../objects/input-objects/inputUser";

export const createUser = async (data: InputUser): Promise<UserEntity> => {
    const connection: Connection = await getLocallyConnection();
    const userFromData: UserEntity = await connection.getRepository(UserEntity)
        .save(data);

    return userFromData;
}