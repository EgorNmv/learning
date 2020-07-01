import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
import { FeedbackEntity } from "../../objects/entities/feedback/entity";
import { findAllFeedbacks } from "./queries/findAllFeedbacks";
import { findFeedbackById } from "./queries/findFeedbackById";
import { InputFeedback } from "../../objects/input-objects/inputFeedback";
import { createFeedback } from "./queries/createFeedback";
import { updateFeedbackById } from "./queries/updateFeedbackById";
import { deleteFeedbackById } from "./queries/deleteFeedbackById";
import { Context } from "../../objects/context";
import { findFeedbacksByTrainingId } from "./queries/findFeedbacksByTrainingId";
import { findFeedbacksByUserId } from "./queries/findFeedbacksByUserId";

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

    @Query(() => [FeedbackEntity])
    public async feedbacksByTrainingId(
        @Ctx() { connection }: Context,
        @Arg("trainingId") trainingId: number,
        @Arg(
            "feedbackType",
            { description: "1 - рекомендация, 2 - отзыв" }
        ) feedbackType: number
    ) {
        return await findFeedbacksByTrainingId(connection, trainingId, feedbackType);
    }

    @Query(() => [FeedbackEntity])
    public async feedbacksByUserId(
        @Ctx() { connection }: Context,
        @Arg("userId") userId: string,
        @Arg("feedbackType") feedbackType: number
    ){
        return await findFeedbacksByUserId(connection, userId, feedbackType);
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