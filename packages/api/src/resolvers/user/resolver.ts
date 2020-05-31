import "reflect-metadata";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { UserEntity } from "../../objects/entities/user/entity";
import { findAllUsers } from "./queries/findAllUsers";
import { findUserById } from "./queries/findUserById";
import { InputUser } from "../../objects/input-objects/inputUser";
import { createUser } from "./queries/createUser";
import { updateUserById } from "./queries/updateUserById";
import { deleteUserById } from "./queries/deleteUserById";
import { Context } from "../../objects/context";

@Resolver(UserEntity)
export class UserResolver {
    @Query(() => UserEntity || null, {
        nullable: true
    })
    public async user(
        @Ctx() { connection }: Context,
        @Arg("id") id: number
    ) {

        return await findUserById(connection, id);
    }

    @Query(() => [UserEntity])
    public async users(
        @Ctx() { connection }: Context
    ) {
        return await findAllUsers(connection);
    }

    @Mutation(() => UserEntity)
    public async createUser(
        @Ctx() { connection }: Context,
        @Arg("data") data: InputUser
    ) {
        return await createUser(connection, data);
    }

    @Mutation(() => UserEntity)
    public async updateUserById(
        @Ctx() { connection }: Context,
        @Arg("id") id: number,
        @Arg("data") data: InputUser
    ) {
        return await updateUserById(connection, id, data);
    }

    @Mutation(() => Boolean)
    public async deleteUserById(
        @Ctx() { connection }: Context,
        @Arg("id") id: number
    ) {
        return await deleteUserById(connection, id);
    }
}
