import { RequestEntity } from "../../../objects/entities/request/entity";
import { Connection } from "typeorm";

export const findAllRequestsByUserId = async (
  connection: Connection,
  userId: string
): Promise<RequestEntity[]> => {
  if (!userId) {
    return [];
  }
  const requestsByUserId: RequestEntity[] = await connection
    .getRepository(RequestEntity)
    .find({
      where: { userId },
      relations: ["training", "training.organizer", "training.category"],
    });

  return requestsByUserId;
};
