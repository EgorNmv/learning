import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { FeedbackEntity } from "../../objects/entities/feedback/entity";
import { findAllFeedbacks } from "./queries/findAllFeedbacks";
import { findFeedbackById } from "./queries/findFeedbackById";
import { InputFeedback } from "../../objects/input-objects/inputFeedback";
import { createFeedback } from "./queries/createFeedback";
import { updateFeedbackById } from "./queries/updateFeedbackById";
import { deleteFeedbackById } from "./queries/deleteFeedbackById";

@Resolver(FeedbackEntity)
export class FeedbackResolver {
    @Query(() => FeedbackEntity)
    public async feedback(@Arg("id") id: number) {
        const feedback: FeedbackEntity = await findFeedbackById(id)

        return feedback;
    }

    @Query(() => [FeedbackEntity])
    public async feedbacks() {
        const feedbacks: FeedbackEntity[] = await findAllFeedbacks();

        return feedbacks;
    }

    @Mutation(() => FeedbackEntity)
    public async createFeedback(@Arg("data") data: InputFeedback) {
        const feedback: FeedbackEntity = await createFeedback(data);

        return feedback;
    }

    @Mutation(() => FeedbackEntity)
    public async updateFeedbackById(@Arg("id") id: number, @Arg("data") data: InputFeedback) {
        const feedback: FeedbackEntity = await updateFeedbackById(id, data);

        return feedback;
    }

    @Mutation(() => Boolean)
    public async deleteFeedbackById(@Arg("id") id: number) {
        return await deleteFeedbackById(id);
    }
}