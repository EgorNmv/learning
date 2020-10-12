import { Arg, Mutation, Query, Resolver, Ctx, Authorized } from "type-graphql";
import { RequestEntity } from "../../objects/entities/request/entity";
import { findRequestById } from "./queries/findRequestById";
import { findAllRequests } from "./queries/findAllRequests";
import { InputRequest } from "../../objects/input-objects/inputRequest";
import { createRequest } from "./queries/createRequest";
import { updateRequestById } from "./queries/updateRequestById";
import { deleteRequestById } from "./queries/deleteRequestById";
import { Context } from "../../objects/context";
import { checkIsRequestAlreadyCreated } from "./queries/checkIsRequestAlreadyCreated";
import { findAllRequestsByTrainingId } from "./queries/findAllRequestsByTrainingId";
import { findAllRequestsByUserId } from "./queries/findAllRequestsByUserId";

@Resolver(RequestEntity)
export class RequestResolver {
  @Query(() => RequestEntity || null, {
    nullable: true,
  })
  public async request(@Ctx() { connection }: Context, @Arg("id") id: number) {
    return await findRequestById(connection, id);
  }

  @Query(() => [RequestEntity])
  public async requests(@Ctx() { connection }: Context) {
    return await findAllRequests(connection);
  }

  @Query(() => Boolean)
  public async isRequestExist(
    @Ctx() { connection }: Context,
    @Arg("userId") userId: string,
    @Arg("trainingId") trainingId: number
  ) {
    return await checkIsRequestAlreadyCreated(connection, userId, trainingId);
  }

  @Query(() => [RequestEntity])
  public async requestsByTrainingId(
    @Ctx() { connection }: Context,
    @Arg("trainingId") trainingId: number
  ) {
    return await findAllRequestsByTrainingId(connection, trainingId);
  }

  @Query(() => [RequestEntity])
  public async requestsBySub(
    @Ctx() { connection }: Context,
    @Arg("userId") userId: string
  ) {
    return await findAllRequestsByUserId(connection, userId);
  }

  @Authorized()
  @Mutation(() => RequestEntity)
  public async createRequest(
    @Ctx() { connection }: Context,
    @Arg("data") data: InputRequest
  ) {
    return await createRequest(connection, data);
  }

  @Authorized()
  @Mutation(() => RequestEntity)
  public async updateRequestById(
    @Ctx() { connection }: Context,
    @Arg("id") id: number,
    @Arg("data") data: InputRequest
  ) {
    return await updateRequestById(connection, id, data);
  }

  @Authorized()
  @Mutation(() => Boolean)
  public async deleteRequestById(
    @Ctx() { connection }: Context,
    @Arg("id") id: number
  ) {
    return await deleteRequestById(connection, id);
  }
}
