import { UserEntity } from "../../../objects/entities/user/entity";
import { Connection } from "typeorm";
import { findUserById } from "./findUserById";
import { InputUser } from "../../../objects/input-objects/inputUser";

export const updateUserById = async (
  connection: Connection,
  id: number,
  data: InputUser
): Promise<UserEntity> => {
  const user: UserEntity = await findUserById(connection, id);

  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }

  const updatedUser: UserEntity = await connection
    .getRepository(UserEntity)
    .save({ ...user, ...data });

  return updatedUser;
};
