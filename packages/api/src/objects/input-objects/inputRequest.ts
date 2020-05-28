import { InputType, Field } from "type-graphql";
import { Request } from "../entities/request/type";

@InputType()
export class InputRequest implements Omit<Request, "id" | "user" | "training">{
    @Field()
    public date: string;

    @Field()
    public userId: number;

    @Field()
    public trainingId: number;
}