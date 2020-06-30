import { RequestEntity } from "../../../objects/entities/request/entity";
import { Connection } from "typeorm";

export const findAllRequestsByUserId = async (
  connection: Connection,
  userId: string
): Promise<RequestEntity[]> => {
  console.info("userId", userId);
  if (!userId) {
    return [];
  }
  const requestsByUserId: RequestEntity[] = await connection
    .getRepository(RequestEntity)
    .find({ where: { userId }, relations: ["training"] });

  return requestsByUserId;
};
