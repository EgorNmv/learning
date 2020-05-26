import { Resolver, Query, Arg } from "type-graphql";
import { TrainingEntity } from "../../objects/entities/training/entity";
import { findTrainingById } from "./queries/findTrainingById";
import { findAllTrainings } from "./queries/findAllTrainings";

@Resolver(TrainingEntity)
export class TrainingResolver {
    @Query(() => TrainingEntity)
    async training(@Arg("id") id: number) {
        const training: TrainingEntity = await findTrainingById(id);

        return training;
    }

    @Query(() => [TrainingEntity])
    async trainings() {
        const trainings: TrainingEntity[] = await findAllTrainings();

        return trainings;
    }
}