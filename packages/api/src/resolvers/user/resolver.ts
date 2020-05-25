import "reflect-metadata";
import { Resolver, Query, Arg } from "type-graphql";
import { User } from "../../objects/entities/user/type";
import { UserEntity } from "../../objects/entities/user/entity";

@Resolver(UserEntity)
export class UserResolver {
    @Query(() => UserEntity)
    async user(@Arg("id") id: number) {
        const user: User = { id: 1, fullname: "Name And Fullname", login: "2332" };

        return user;
    }
}
