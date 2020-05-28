import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { OrganizerEntity } from "../../objects/entities/oraganizer/entity";
import { findOrganizerById } from "./queries/findOrganizerById";
import { findAllOrganizers } from "./queries/findAllOrganizers";
import { InputOrganizer } from "../../objects/input-objects/inputOrganizer";
import { createOrganizer } from "./queries/createOrganizer";
import { updateOrganizerById } from "./queries/updateOrganizerById";
import { deleteOrganizerById } from "./queries/deleteOrganizerById";

@Resolver(OrganizerEntity)
export class OrganizerResolver {
    @Query(() => OrganizerEntity)
    public async organizer(@Arg("id") id: number) {
        const material: OrganizerEntity = await findOrganizerById(id);

        return material;
    }

    @Query(() => [OrganizerEntity])
    public async organizers() {
        const materials: OrganizerEntity[] = await findAllOrganizers();

        return materials;
    }

    @Mutation(() => OrganizerEntity)
    public async createOrganizer(@Arg("data") data: InputOrganizer) {
        const organizer: OrganizerEntity = await createOrganizer(data);

        return organizer;
    }

    @Mutation(() => OrganizerEntity)
    public async updateOrganizerById(
        @Arg("id") id: number,
        @Arg("data") data: InputOrganizer
    ) {
        const updatedOrganizer: OrganizerEntity = await updateOrganizerById(id, data);

        return updatedOrganizer;
    }

    @Mutation(() => Boolean)
    public async deleteOrganizerById(@Arg("id") id: number) {
        return await deleteOrganizerById(id);
    }
}