import { InputType, Field } from "type-graphql";
import { User } from "../entities/user/type";

@InputType()
export class InputUser implements Omit<User, "id" | "role"> {
    @Field()
    public fullname: string;

    @Field()
    public login: string;

    @Field()
    public roleId: number;

    @Field({ nullable: true })
    public photo: string;
}