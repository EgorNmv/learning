import "reflect-metadata";
import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {UserEntity} from "../../objects/entities/user/entity";
import {findAllUsers} from "./queries/findAllUsers";
import {findUserById} from "./queries/findUserById";
import {InputUser} from "../../objects/input-objects/inputUser";
import {createUser} from "./queries/createUser";
import {updateUserById} from "./queries/updateUserById";
import {deleteUserById} from "./queries/deleteUserById";

@Resolver(UserEntity)
export class UserResolver {
    @Query(() => UserEntity || null, {
        nullable: true
    })
    public async user(@Arg("id") id: number) {
        return await findUserById(id);
    }

    @Query(() => [UserEntity])
    public async users() {
        return await findAllUsers();
    }

    @Mutation(() => UserEntity)
    public async createUser(@Arg("data") data: InputUser) {
        return await createUser(data);
    }

    @Mutation(() => UserEntity)
    public async updateUserById(
        @Arg("id") id: number,
        @Arg("data") data: InputUser
    ) {
        return await updateUserById(id, data);
    }

    @Mutation(() => Boolean)
    public async deleteUserById(@Arg("id") id: number) {
        return await deleteUserById(id);
    }
}
