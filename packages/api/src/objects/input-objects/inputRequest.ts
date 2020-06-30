import { InputType, Field } from "type-graphql";
import { Request } from "../entities/request/type";

@InputType()
export class InputRequest implements Omit<Request, "id" | "user" | "training">{
    @Field()
    public date: string;

    @Field()
    public userId: string;

    @Field()
    public trainingId: number;

    @Field({ nullable:true })
    public status: number;
}