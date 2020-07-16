import { RequestEntity } from "../../../objects/entities/request/entity";
import { Connection } from "typeorm";

export const findRequestById = async (
  connection: Connection,
  id: number
): Promise<RequestEntity | null> => {
  const request: RequestEntity = await connection
    .getRepository(RequestEntity)
    .findOne({
      where: { id },
      relations: ["training"],
    });

  if (!request) {
    return null;
  }

  return request;
};
