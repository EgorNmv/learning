import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {TargetAudienceEntity} from "../../objects/entities/target-audience/entity";
import {findTargetAudienceById} from "./queries/findTargetAudienceById";
import {findAllTargetAudiences} from "./queries/findAllTargetAudiences";
import {deleteTargetAudienceById} from "./queries/deleteTargetAudienceById";
import {updateTargetAudienceById} from "./queries/updateTargetAudienceById";
import {createTargetAudience} from "./queries/createTargetAudience";

@Resolver(TargetAudienceEntity)
export class TargetAudienceResolver {
    @Query(() => TargetAudienceEntity || null, {
        nullable: true
    })
    public async targetAudience(@Arg("id") id: number) {
        return await findTargetAudienceById(id);
    }

    @Query(() => [TargetAudienceEntity])
    public async targetAudiences() {
        return await findAllTargetAudiences();
    }

    @Mutation(() => TargetAudienceEntity)
    public async createTargetAudience(@Arg("description") description: string) {
        return await createTargetAudience(description);
    }

    @Mutation(() => TargetAudienceEntity)
    public async updateTargetAudienceById(
        @Arg("id") id: number,
        @Arg("description") description: string
    ) {
        return await updateTargetAudienceById(id, description);
    }

    @Mutation(() => Boolean)
    async deleteTargetAudienceById(@Arg("id") id: number) {
        return await deleteTargetAudienceById(id);
    }
}