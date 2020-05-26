import { Resolver, Query, Arg } from "type-graphql";
import { FeedbackEntity } from "../../objects/entities/feedback/entity";
import { findAllFeedbacks } from "./queries/findAllFeedbacks";
import { findFeedbackById } from "./queries/findFeedbackById";

@Resolver(FeedbackEntity)
export class FeedbackResolver {
    @Query(() => FeedbackEntity)
    async feedback(@Arg("id") id: number) {
        const feedback: FeedbackEntity = await findFeedbackById(id)

        return feedback;
    }

    @Query(() => [FeedbackEntity])
    async feedbacks() {
        const feedbacks: FeedbackEntity[] = await findAllFeedbacks();

        return feedbacks;
    }
}