import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
import { TrainingEntity } from "../../objects/entities/training/entity";
import { findTrainingById } from "./queries/findTrainingById";
import { findAllTrainings } from "./queries/findAllTrainings";
import { InputTraining } from "../../objects/input-objects/inputTraining";
import { updateTrainingById } from "./queries/updateTrainingById";
import { deleteTrainingById } from "./queries/deleteTrainingById";
import { createTraining } from "./queries/createTraining";
import { Context } from "../../objects/context";

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