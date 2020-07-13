import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Ctx,
  FieldResolver,
  Root,
} from "type-graphql";
import { TrainingEntity } from "../../objects/entities/training/entity";
import { findTrainingById } from "./queries/findTrainingById";
import { findAllTrainings } from "./queries/findAllTrainings";
import { InputTraining } from "../../objects/input-objects/inputTraining";
import { updateTrainingById } from "./queries/updateTrainingById";
import { deleteTrainingById } from "./queries/deleteTrainingById";
import { createTraining } from "./queries/createTraining";
import { Context } from "../../objects/context";
import { findAllTrainingsByCategoryId } from "./queries/findAllTrainingsByCategoryId";
import { findAllNewTrainings } from "./queries/findAllNewTrainings";
import { findAllComingTrainings } from "./queries/findAllComingTrainings";
import { findAllSortedTrainings } from "./queries/findAllSortedTrainings";
import { findAllTrainingBySearchText } from "./queries/findAllTrainingBySearchText";
import { getListOfRequestsReviewsAndRecomendsByTrainingId } from "./queries/getListOfRequestsReviewsAndRecomendsByTrainingId";

@Resolver(TrainingEntity)
export class TrainingResolver {
  @FieldResolver(() => [Number])
  public async listOfRequestsReviewsAndRecomends(
    @Ctx() { connection }: Context,
    @Root() training: TrainingEntity
  ) {
    return await getListOfRequestsReviewsAndRecomendsByTrainingId(
      connection,
      training.id
    );
  }

  @Query(() => TrainingEntity || null, {
    nullable: true,
  })
  public async training(@Ctx() { connection }: Context, @Arg("id") id: number) {
    return await findTrainingById(connection, id);
  }

  @Query(() => [TrainingEntity])
  public async trainings(@Ctx() { connection }: Context) {
    return await findAllTrainings(connection);
  }

  @Query(() => [TrainingEntity])
  public async trainingsByCategoryId(
    @Ctx() { connection }: Context,
    @Arg("categoryId") categoryId: number
  ) {
    return await findAllTrainingsByCategoryId(connection, categoryId);
  }

  @Query(() => [TrainingEntity])
  public async newTrainings(@Ctx() { connection }: Context) {
    return await findAllNewTrainings(connection);
  }

  @Query(() => [TrainingEntity])
  public async comingTrainings(@Ctx() { connection }: Context) {
    return await findAllComingTrainings(connection);
  }

  @Query(() => [TrainingEntity])
  public async sortedTraining(
    @Ctx() { connection }: Context,
    @Arg("sortBy") sortBy: "name" | "createDate" | "recommends",
    @Arg("sortOrder") sortOrder: "ASC" | "DESC",
    @Arg("categoryId") categoryId: number
  ) {
    return await findAllSortedTrainings(
      connection,
      sortBy,
      sortOrder,
      categoryId
    );
  }

  @Query(() => [TrainingEntity])
  public async searchableTrainings(
    @Ctx() { connection }: Context,
    @Arg("searchBy") searchBy: string,
    @Arg("searchText") searchText: string
  ) {
    return await findAllTrainingBySearchText(connection, searchBy, searchText);
  }

  @Mutation(() => TrainingEntity)
  public async createTraining(
    @Ctx() { connection }: Context,
    @Arg("data") data: InputTraining
  ) {
    return await createTraining(connection, data);
  }

  @Mutation(() => TrainingEntity)
  public async updateTrainingById(
    @Ctx() { connection }: Context,
    @Arg("id") id: number,
    @Arg("data") data: InputTraining
  ) {
    return await updateTrainingById(connection, id, data);
  }

  @Mutation(() => Boolean)
  public async deleteTrainingById(
    @Ctx() { connection }: Context,
    @Arg("id") id: number
  ) {
    return await deleteTrainingById(connection, id);
  }
}
