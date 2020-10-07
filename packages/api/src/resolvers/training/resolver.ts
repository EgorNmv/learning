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
import { findAllTrainingsForReport } from "./queries/findAllTrainingsForReport";
import { createReportByTrainingIdsAndWriteIt } from "./queries/createReportByTrainingIdsAndWriteIt";
import { getAverageRatingByTrainingId } from "./queries/getAverageRatingByTrainingId";
import { createReportOnAllEventsAndWriteIt } from "./queries/createReportOnAllEventsAndWriteIt";

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

  @FieldResolver(() => Number || null, {
    nullable: true,
  })
  public async averageRating(
    @Ctx() { connection }: Context,
    @Root() training: TrainingEntity
  ) {
    return await getAverageRatingByTrainingId(connection, training.id);
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
    @Arg("searchBy")
    searchBy: "name" | "date" | "format" | "audience" | "category",
    @Arg("searchText", { nullable: true }) searchText: string
  ) {
    return await findAllTrainingBySearchText(connection, searchBy, searchText);
  }

  @Query(() => [TrainingEntity])
  public async trainingsForReport(
    @Ctx() { connection }: Context,
    @Arg("categoryId") categoryId: number,
    @Arg("organizerId") organizerId: number,
    @Arg("targetAudienceId") targetAudienceId: number,
    @Arg("formatId") formatId: number,
    @Arg("startDate", { nullable: true }) startDate: string,
    @Arg("endDate", { nullable: true }) endDate: string,
    @Arg("withTrainingsWithoutDate") withTrainingsWithoutDate: boolean
  ) {
    return await findAllTrainingsForReport(
      connection,
      categoryId,
      organizerId,
      targetAudienceId,
      formatId,
      startDate,
      endDate,
      withTrainingsWithoutDate
    );
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

  @Mutation(() => String)
  public async createReportByTrainingIds(
    @Ctx() { connection }: Context,
    @Arg("ids", (type) => [Number]) ids: number[]
  ) {
    return await createReportByTrainingIdsAndWriteIt(connection, ids);
  }

  @Mutation(() => String)
  public async createReportOnAllEvents(@Ctx() { connection }: Context) {
    return await createReportOnAllEventsAndWriteIt(connection);
  }
}
