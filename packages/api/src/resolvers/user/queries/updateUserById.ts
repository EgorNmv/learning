import { UserEntity } from "../../../objects/entities/user/entity";
import { Connection } from "typeorm";
import { findUserById } from "./findUserById";
import { InputUser } from "../../../objects/input-objects/inputUser";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const updateUserById = async (id: number, data: InputUser): Promise<UserEntity> => {
    const connection: Connection = await getLocallyConnection();
    const user: UserEntity = await findUserById(id);

    if (!user) {
        throw new Error(`User with id ${id} not found`);
    }

    const updatedUser: UserEntity = await connection.getRepository(UserEntity)
        .save({ ...user, ...data });

    return updatedUser;
}