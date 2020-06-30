import { Connection } from "typeorm";
import { RequestEntity } from "../../../objects/entities/request/entity";

export const findAllRequestsByTrainingId = async (
  connection: Connection,
  trainingId: number
): Promise<RequestEntity[]> => {
  const requests: RequestEntity[] = await connection
    .getRepository(RequestEntity)
    .find({ where: { trainingId } });

  return requests;
};
