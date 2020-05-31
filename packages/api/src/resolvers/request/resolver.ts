import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
import { RequestEntity } from "../../objects/entities/request/entity";
import { findRequestById } from "./queries/findRequestById";
import { findAllRequests } from "./queries/findAllRequests";
import { InputRequest } from "../../objects/input-objects/inputRequest";
import { createRequest } from "./queries/createRequest";
import { updateRequestById } from "./queries/updateRequestById";
import { deleteRequestById } from "./queries/deleteRequestById";
import { Context } from "../../objects/context";

@Resolver(RequestEntity)
export class RequestResolver {
    @Query(() => RequestEntity || null, {
        nullable: true
    })
    public async request(
        @Ctx() { connection }: Context,
        @Arg("id") id: number
    ) {
        return await findRequestById(connection, id);
    }

    @Query(() => [RequestEntity])
    public async requests(
        @Ctx() { connection }: Context,
    ) {
        return await findAllRequests(connection);
    }

    @Mutation(() => RequestEntity)
    public async createRequest(
        @Ctx() { connection }: Context,
        @Arg("data") data: InputRequest
    ) {
        return await createRequest(connection, data);
    }

    @Mutation(() => RequestEntity)
    public async updateOrganizerById(
        @Ctx() { connection }: Context,
        @Arg("id") id: number,
        @Arg("data") data: InputRequest
    ) {
        return await updateRequestById(connection, id, data);
    }

    @Mutation(() => Boolean)
    public async deleteOrganizerById(
        @Ctx() { connection }: Context,
        @Arg("id") id: number
    ) {
        return await deleteRequestById(connection, id);
    }
}