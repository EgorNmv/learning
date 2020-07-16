import { UserEntity } from "../../../objects/entities/user/entity";
import { Connection } from "typeorm";

export const findUserById = async (
  connection: Connection,
  id: number
): Promise<UserEntity | null> => {
  const user: UserEntity = await connection.getRepository(UserEntity).findOne({
    where: { id },
    relations: ["role"],
  });

  if (!user) {
    return null;
  }

  return user;
};
