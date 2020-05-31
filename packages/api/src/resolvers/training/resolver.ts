import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {TrainingEntity} from "../../objects/entities/training/entity";
import {findTrainingById} from "./queries/findTrainingById";
import {findAllTrainings} from "./queries/findAllTrainings";
import {InputTraining} from "../../objects/input-objects/inputTraining";
import {updateTrainingById} from "./queries/updateTrainingById";
import {deleteTrainingById} from "./queries/deleteTrainingById";
import {createTraining} from "./queries/createTraining";

@Resolver(TrainingEntity)
export class TrainingResolver {
    @Query(() => TrainingEntity || null, {
        nullable: true
    })
    public async training(@Arg("id") id: number) {
        return await findTrainingById(id);
    }

    @Query(() => [TrainingEntity])
    public async trainings() {
        return await findAllTrainings();
    }

    @Mutation(() => TrainingEntity)
    public async createTraining(@Arg("data") data: InputTraining) {
        return await createTraining(data);
    }

    @Mutation(() => TrainingEntity)
    public async updateTrainingById(
        @Arg("id") id: number,
        @Arg("data") data: InputTraining) {
        return await updateTrainingById(id, data);
    }

    @Mutation(() => Boolean)
    public async deleteTrainingById(@Arg("id") id: number) {
        return await deleteTrainingById(id);
    }
}