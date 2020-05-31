import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
import { FeedbackEntity } from "../../objects/entities/feedback/entity";
import { findAllFeedbacks } from "./queries/findAllFeedbacks";
import { findFeedbackById } from "./queries/findFeedbackById";
import { InputFeedback } from "../../objects/input-objects/inputFeedback";
import { createFeedback } from "./queries/createFeedback";
import { updateFeedbackById } from "./queries/updateFeedbackById";
import { deleteFeedbackById } from "./queries/deleteFeedbackById";
import { Context } from "../../objects/context";

@Resolver(FeedbackEntity)
export class FeedbackResolver {
    @Query(() => FeedbackEntity || null, {
        nullable: true
    })
    public async feedback(
        @Ctx() { connection }: Context,
        @Arg("id") id: number
    ) {
        return await findFeedbackById(connection, id);
    }

    @Query(() => [FeedbackEntity])
    public async feedbacks(
        @Ctx() { connection }: Context
    ) {
        return await findAllFeedbacks(connection);
    }

    @Mutation(() => FeedbackEntity)
    public async createFeedback(
        @Ctx() { connection }: Context,
        @Arg("data") data: InputFeedback
    ) {
        return await createFeedback(connection, data);
    }

    @Mutation(() => FeedbackEntity)
    public async updateFeedbackById(
        @Ctx() { connection }: Context,
        @Arg("id") id: number,
        @Arg("data") data: InputFeedback
    ) {
        return await updateFeedbackById(connection, id, data);
    }

    @Mutation(() => Boolean)
    public async deleteFeedbackById(
        @Ctx() { connection }: Context,
        @Arg("id") id: number
    ) {
        return await deleteFeedbackById(connection, id);
    }
}