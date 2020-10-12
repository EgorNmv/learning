import { Arg, Mutation, Query, Resolver, Ctx, Authorized } from "type-graphql";
import { OrganizerEntity } from "../../objects/entities/oraganizer/entity";
import { findOrganizerById } from "./queries/findOrganizerById";
import { findAllOrganizers } from "./queries/findAllOrganizers";
import { InputOrganizer } from "../../objects/input-objects/inputOrganizer";
import { createOrganizer } from "./queries/createOrganizer";
import { updateOrganizerById } from "./queries/updateOrganizerById";
import { deleteOrganizerById } from "./queries/deleteOrganizerById";
import { Context } from "../../objects/context";

@Resolver(OrganizerEntity)
export class OrganizerResolver {
  @Query(() => OrganizerEntity || null, {
    nullable: true,
  })
  public async organizer(
    @Ctx() { connection }: Context,
    @Arg("id") id: number
  ) {
    return await findOrganizerById(connection, id);
  }

  @Query(() => [OrganizerEntity])
  public async organizers(@Ctx() { connection }: Context) {
    return await findAllOrganizers(connection);
  }

  @Authorized()
  @Mutation(() => OrganizerEntity)
  public async createOrganizer(
    @Ctx() { connection }: Context,
    @Arg("data") data: InputOrganizer
  ) {
    return await createOrganizer(connection, data);
  }

  @Authorized()
  @Mutation(() => OrganizerEntity)
  public async updateOrganizerById(
    @Ctx() { connection }: Context,
    @Arg("id") id: number,
    @Arg("data") data: InputOrganizer
  ) {
    return await updateOrganizerById(connection, id, data);
  }

  @Authorized()
  @Mutation(() => Boolean)
  public async deleteOrganizerById(
    @Ctx() { connection }: Context,
    @Arg("id") id: number
  ) {
    return await deleteOrganizerById(connection, id);
  }
}
