import { Resolver, Query, Arg, FieldResolver, Root, Mutation } from "type-graphql";
import { TrainingEntity } from "../../objects/entities/training/entity";
import { findTrainingById } from "./queries/findTrainingById";
import { findAllTrainings } from "./queries/findAllTrainings";
import { InputTraining } from "../../objects/input-objects/inputTraining";
import { updateTrainingById } from "./queries/updateTrainingById";
import { deleteTrainingById } from "./queries/deleteTrainingById";
import { createTraining } from "./queries/createTraining";

@Resolver(TrainingEntity)
export class TrainingResolver {
    @Query(() => TrainingEntity)
    public async training(@Arg("id") id: number) {
        const training: TrainingEntity = await findTrainingById(id);

        return training;
    }

    @Query(() => [TrainingEntity])
    public async trainings() {
        const trainings: TrainingEntity[] = await findAllTrainings();

        return trainings;
    }

    @Mutation(() => TrainingEntity)
    public async createTraining(@Arg("data") data: InputTraining) {
        const training: TrainingEntity = await createTraining(data);

        return training;
    }

    @Mutation(() => TrainingEntity)
    public async updateTrainingById(
        @Arg("id") id: number,
        @Arg("data") data: InputTraining) {
        const training: TrainingEntity = await updateTrainingById(id, data);

        return training;
    }

    @Mutation(() => Boolean)
    public async deleteTrainingById(@Arg("id") id: number) {
        return await deleteTrainingById(id);
    }
}