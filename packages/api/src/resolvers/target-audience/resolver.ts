import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { TargetAudienceEntity } from "../../objects/entities/target-audience/entity";
import { findTargetAudienceById } from "./queries/findTargetAudienceById";
import { findAllTargetAudiences } from "./queries/findAllTargetAudiences";
import { deleteTargetAudienceById } from "./queries/deleteTargetAudienceById";
import { updateTargetAudienceById } from "./queries/updateTargetAudienceById";
import { createTargetAudience } from "./queries/createTargetAudience";

@Resolver(TargetAudienceEntity)
export class TargetAudienceResolver {
    @Query(() => TargetAudienceEntity)
    public async targetAudience(@Arg("id") id: number) {
        const targetAudience: TargetAudienceEntity = await findTargetAudienceById(id);

        return targetAudience;
    }

    @Query(() => [TargetAudienceEntity])
    public async targetAudiences() {
        const targetAudiences: TargetAudienceEntity[] = await findAllTargetAudiences();

        return targetAudiences;
    }

    @Mutation(() => TargetAudienceEntity)
    public async createTargetAudience(@Arg("description") description: string) {
        const targetAudience: TargetAudienceEntity = await createTargetAudience(description);

        return targetAudience;
    }

    @Mutation(() => TargetAudienceEntity)
    public async updateTargetAudienceById(
        @Arg("id") id: number,
        @Arg("description") description: string
    ) {
        const updatedTargetAudience: TargetAudienceEntity = await updateTargetAudienceById(id, description);

        return updatedTargetAudience;
    }

    @Mutation(() => Boolean)
    async deleteTargetAudienceById(@Arg("id") id: number) {
        return await deleteTargetAudienceById(id);
    }
}