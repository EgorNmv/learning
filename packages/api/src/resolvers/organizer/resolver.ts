import { Resolver, Query, Arg } from "type-graphql";
import { OrganizerEntity } from "../../objects/entities/oraganizer/entity";
import { findOrganizerById } from "./queries/findOrganizerById";
import { findAllOrganizers } from "./queries/findAllOrganizers";

@Resolver(OrganizerEntity)
export class OrganizerResolver {
    @Query(() => OrganizerEntity)
    async organizer(@Arg("id") id: number) {
        const material: OrganizerEntity = await findOrganizerById(id);

        return material;
    }

    @Query(() => [OrganizerEntity])
    async organizers() {
        const materials: OrganizerEntity[] = await findAllOrganizers();

        return materials;
    }
}