import "reflect-metadata";
import { Resolver, Query, Arg } from "type-graphql";
import { User } from "../../objects/entities/user/type";
import { UserEntity } from "../../objects/entities/user/entity";
import { findAllUsers } from "./queries/findAllUsers";
import { findUserById } from "./queries/findUserById";

@Resolver(UserEntity)
export class UserResolver {
    @Query(() => UserEntity)
    async user(@Arg("id") id: number) {
        const user: User = await findUserById(id);

        return user;
    }

    @Query(() => [UserEntity])
    async users() {
        const users: UserEntity[] = await findAllUsers();

        return users || [];
    }
}
