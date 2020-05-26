import { Resolver, Query, Arg } from "type-graphql";
import { TargetAudienceEntity } from "../../objects/entities/target-audience/entity";
import { findTargetAudienceById } from "./queries/findTargetAudienceById";
import { findAllTargetAudiences } from "./queries/findAllTargetAudiences";

@Resolver(TargetAudienceEntity)
export class TargetAudienceResolver {
    @Query(() => TargetAudienceEntity)
    async targetAudience(@Arg("id") id: number) {
        const targetAudience: TargetAudienceEntity = await findTargetAudienceById(id);

        return targetAudience;
    }

    @Query(() => [TargetAudienceEntity])
    async targetAudiences() {
        const targetAudiences: TargetAudienceEntity[] = await findAllTargetAudiences();

        return targetAudiences;
    }
}