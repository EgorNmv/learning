import "reflect-metadata";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { User } from "../../objects/entities/user/type";
import { UserEntity } from "../../objects/entities/user/entity";
import { findAllUsers } from "./queries/findAllUsers";
import { findUserById } from "./queries/findUserById";
import { InputUser } from "../../objects/input-objects/inputUser";
import { createUser } from "./queries/createUser";
import { updateUserById } from "./queries/updateUserById";
import { deleteUserById } from "./queries/deleteUserById";

@Resolver(UserEntity)
export class UserResolver {
    @Query(() => UserEntity)
    public async user(@Arg("id") id: number) {
        const user: User = await findUserById(id);

        return user;
    }

    @Query(() => [UserEntity])
    public async users() {
        const users: UserEntity[] = await findAllUsers();

        return users || [];
    }

    @Mutation(() => UserEntity)
    public async createUser(@Arg("data") data: InputUser) {
        const user: UserEntity = await createUser(data);

        return user;
    }

    @Mutation(() => UserEntity)
    public async updateUserById(
        @Arg("id") id: number,
        @Arg("data") data: InputUser
    ) {
        const updatedUser: UserEntity = await updateUserById(id, data);

        return updatedUser;
    }

    @Mutation(() => Boolean)
    public async deleteUserById(@Arg("id") id: number) {
        return await deleteUserById(id);
    }
}
