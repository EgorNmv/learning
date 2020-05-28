import { InputType, Field } from "type-graphql";
import { User } from "../entities/user/type";

@InputType()
export class InputUser implements Omit<User, "id"> {
    @Field()
    public fullname: string;

    @Field()
    public login: string
}