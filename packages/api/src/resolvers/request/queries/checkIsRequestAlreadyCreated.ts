import { Connection } from "typeorm";
import { RequestEntity } from "../../../objects/entities/request/entity";

export const checkIsRequestAlreadyCreated = async (
  connection: Connection,
  userId: string,
  trainingId: number
): Promise<boolean> => {
  const request: RequestEntity = await connection
    .getRepository(RequestEntity)
    .findOne({ where: { userId, trainingId } });

  return request ? true : false;
};
