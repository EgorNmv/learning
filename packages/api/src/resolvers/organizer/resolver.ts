import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {OrganizerEntity} from "../../objects/entities/oraganizer/entity";
import {findOrganizerById} from "./queries/findOrganizerById";
import {findAllOrganizers} from "./queries/findAllOrganizers";
import {InputOrganizer} from "../../objects/input-objects/inputOrganizer";
import {createOrganizer} from "./queries/createOrganizer";
import {updateOrganizerById} from "./queries/updateOrganizerById";
import {deleteOrganizerById} from "./queries/deleteOrganizerById";

@Resolver(OrganizerEntity)
export class OrganizerResolver {
    @Query(() => OrganizerEntity || null, {
        nullable: true
    })
    public async organizer(@Arg("id") id: number) {
        return await findOrganizerById(id);
    }

    @Query(() => [OrganizerEntity])
    public async organizers() {
        return await findAllOrganizers();
    }

    @Mutation(() => OrganizerEntity)
    public async createOrganizer(@Arg("data") data: InputOrganizer) {
        return await createOrganizer(data);
    }

    @Mutation(() => OrganizerEntity)
    public async updateOrganizerById(
        @Arg("id") id: number,
        @Arg("data") data: InputOrganizer
    ) {
        return await updateOrganizerById(id, data);
    }

    @Mutation(() => Boolean)
    public async deleteOrganizerById(@Arg("id") id: number) {
        return await deleteOrganizerById(id);
    }
}