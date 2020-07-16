import { RequestEntity } from "../../../objects/entities/request/entity";
import { Connection } from "typeorm";

export const findAllRequests = async (
  connection: Connection
): Promise<RequestEntity[]> => {
  return await connection.getRepository(RequestEntity).find({
    relations: ["training"],
    order: { id: "ASC" },
  });
};
