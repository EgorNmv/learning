import { InputType, Field } from "type-graphql";
import { Material } from "../entities/material/type";

@InputType()
export class InputMaterial implements Omit<Material, "id" | "training">{
    @Field()
    public link: string;

    @Field()
    public trainingId: number;
}