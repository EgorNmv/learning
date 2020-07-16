import { Connection } from "typeorm";
import { InputRequest } from "../../../objects/input-objects/inputRequest";
import { RequestEntity } from "../../../objects/entities/request/entity";
import { findRequestById } from "./findRequestById";

export const updateRequestById = async (
  connection: Connection,
  id: number,
  data: Partial<InputRequest>
): Promise<RequestEntity> => {
  const request: RequestEntity = await findRequestById(connection, id);

  if (!request) {
    throw new Error(`Request with id ${id} not found`);
  }

  const updatedRequest: RequestEntity = await connection
    .getRepository(RequestEntity)
    .save({ ...request, ...data });

  return updatedRequest;
};
