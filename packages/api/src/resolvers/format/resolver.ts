import "reflect-metadata";
import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
import { FormatEntity } from "../../objects/entities/format/entity";
import { findFormatById } from "./queries/findFormatById";
import { findAllFormats } from "./queries/findAllFormats";
import { createFormat } from "./queries/createFormat";
import { updateFormatById } from "./queries/updateFormatById";
import { deleteFormatById } from "./queries/deleteFormatById";
import { Context } from "../../objects/context";

@Resolver(FormatEntity)
export class FormatResolver {
    @Query(() => FormatEntity || null, {
        nullable: true
    })
    public async format(
        @Ctx() { connection }: Context,
        @Arg("id") id: number
    ) {
        return await findFormatById(connection, id);
    }

    @Query(() => [FormatEntity])
    public async formats(
        @Ctx() { connection }: Context,
    ) {
        return await findAllFormats(connection);
    }

    @Mutation(() => FormatEntity)
    public async createFormat(
        @Ctx() { connection }: Context,
        @Arg("description") description: string) {
        return await createFormat(connection, description);
    }

    @Mutation(() => FormatEntity)
    public async updateFormatById(
        @Ctx() { connection }: Context,
        @Arg("id") id: number,
        @Arg("description") description: string) {
        return await updateFormatById(connection, id, description);
    }

    @Mutation(() => Boolean)
    public async deleteFormatById(
        @Ctx() { connection }: Context,
        @Arg("id") id: number
    ) {
        return await deleteFormatById(connection, id);
    }
}