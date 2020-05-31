import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {FeedbackEntity} from "../../objects/entities/feedback/entity";
import {findAllFeedbacks} from "./queries/findAllFeedbacks";
import {findFeedbackById} from "./queries/findFeedbackById";
import {InputFeedback} from "../../objects/input-objects/inputFeedback";
import {createFeedback} from "./queries/createFeedback";
import {updateFeedbackById} from "./queries/updateFeedbackById";
import {deleteFeedbackById} from "./queries/deleteFeedbackById";

@Resolver(FeedbackEntity)
export class FeedbackResolver {
    @Query(() => FeedbackEntity || null, {
        nullable: true
    })
    public async feedback(@Arg("id") id: number) {
        return await findFeedbackById(id);
    }

    @Query(() => [FeedbackEntity])
    public async feedbacks() {
        return await findAllFeedbacks();
    }

    @Mutation(() => FeedbackEntity)
    public async createFeedback(@Arg("data") data: InputFeedback) {
        return await createFeedback(data);
    }

    @Mutation(() => FeedbackEntity)
    public async updateFeedbackById(@Arg("id") id: number, @Arg("data") data: InputFeedback) {
        return await updateFeedbackById(id, data);
    }

    @Mutation(() => Boolean)
    public async deleteFeedbackById(@Arg("id") id: number) {
        return await deleteFeedbackById(id);
    }
}