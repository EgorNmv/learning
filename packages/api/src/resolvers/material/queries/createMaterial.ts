import { MaterialEntity } from "../../../objects/entities/material/entity";
import { Connection } from "typeorm";
import { InputMaterial } from "../../../objects/input-objects/inputMaterial";

export const createMaterial = async (
  connection: Connection,
  data: InputMaterial
): Promise<MaterialEntity> => {
  const material: MaterialEntity = await connection
    .getRepository(MaterialEntity)
    .save({ ...data });

  return material;
};
