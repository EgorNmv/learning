import { InputType, Field } from "type-graphql";
import { Material } from "../entities/material/type";

@InputType()
export class InputMaterial
  implements Omit<Material, "id" | "training" | "createdAt" | "deletedAt"> {
  @Field()
  public link: string;

  @Field()
  public trainingId: number;

  @Field({ nullable: true })
  public originName: string;
}
