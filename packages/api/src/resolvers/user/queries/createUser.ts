import { UserEntity } from "../../../objects/entities/user/entity";
import { Connection } from "typeorm";
import { InputUser } from "../../../objects/input-objects/inputUser";

export const createUser = async (
  connection: Connection,
  data: InputUser
): Promise<UserEntity> => {
  const userFromData: UserEntity = await connection
    .getRepository(UserEntity)
    .save(data);

  return userFromData;
};
