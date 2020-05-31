import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
import { TargetAudienceEntity } from "../../objects/entities/target-audience/entity";
import { findTargetAudienceById } from "./queries/findTargetAudienceById";
import { findAllTargetAudiences } from "./queries/findAllTargetAudiences";
import { deleteTargetAudienceById } from "./queries/deleteTargetAudienceById";
import { updateTargetAudienceById } from "./queries/updateTargetAudienceById";
import { createTargetAudience } from "./queries/createTargetAudience";
import { Context } from "../../objects/context";

@Resolver(TargetAudienceEntity)
export class TargetAudienceResolver {
    @Query(() => TargetAudienceEntity || null, {
        nullable: true
    })
    public async targetAudience(
        @Ctx() { connection }: Context,
        @Arg("id") id: number) {
        return await findTargetAudienceById(connection, id);
    }

    @Query(() => [TargetAudienceEntity])
    public async targetAudiences(
        @Ctx() { connection }: Context,
    ) {
        return await findAllTargetAudiences(connection);
    }

    @Mutation(() => TargetAudienceEntity)
    public async createTargetAudience(
        @Ctx() { connection }: Context,
        @Arg("description") description: string
    ) {
        return await createTargetAudience(connection, description);
    }

    @Mutation(() => TargetAudienceEntity)
    public async updateTargetAudienceById(
        @Ctx() { connection }: Context,
        @Arg("id") id: number,
        @Arg("description") description: string
    ) {
        return await updateTargetAudienceById(connection, id, description);
    }

    @Mutation(() => Boolean)
    async deleteTargetAudienceById(
        @Ctx() { connection }: Context,
        @Arg("id") id: number
    ) {
        return await deleteTargetAudienceById(connection, id);
    }
}