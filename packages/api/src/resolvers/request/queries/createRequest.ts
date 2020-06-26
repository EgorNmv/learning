import { Connection } from "typeorm";
import { InputRequest } from "../../../objects/input-objects/inputRequest";
import { RequestEntity } from "../../../objects/entities/request/entity";
import { findRequestById } from "./findRequestById";

export const createRequest = async (
  connection: Connection,
  data: InputRequest
): Promise<RequestEntity> => {
  const { id }: RequestEntity = await connection
    .getRepository(RequestEntity)
    .save({ ...data });
  const newFeedback: RequestEntity = await findRequestById(connection, id);

  return newFeedback;
};
