import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
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

@Resolver(TrainingEntity)
export class TrainingResolver {
    @Query(() => TrainingEntity || null, {
        nullable: true
    })
    public async training(
        @Ctx() { connection }: Context,
        @Arg("id") id: number) {
        return await findTrainingById(connection, id);
    }

    @Query(() => [TrainingEntity])
    public async trainings(
        @Ctx() { connection }: Context,
    ) {
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
    public async newTrainings(
        @Ctx() { connection }: Context
    ) {
        return await findAllNewTrainings(connection);
    }

    @Query(() => [TrainingEntity])
    public async comingTrainings(
        @Ctx() { connection }: Context
    ) {
        return await findAllComingTrainings(connection);
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
        @Arg("data") data: InputTraining) {
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