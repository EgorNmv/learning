import { Connection } from "typeorm"
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection"
import { findUserById } from "./findUserById";
import { UserEntity } from "../../../objects/entities/user/entity";


export const deleteUserById = async (id: number): Promise<boolean> => {
    const connection: Connection = await getLocallyConnection();
    const user: UserEntity = await findUserById(id);
    let isUserRemoved: boolean = false;

    if (!user) {
        throw new Error(`User with id ${id} not found`);
    }

    try {
        await connection.getRepository(UserEntity).remove(user);
        isUserRemoved = true;
    } catch (error) {
        console.info(`Error in deleteUserById ${error}`);
    }

    return isUserRemoved;
}