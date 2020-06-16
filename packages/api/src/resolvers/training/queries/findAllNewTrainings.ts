import { Connection } from "typeorm";
import { TrainingEntity } from "../../../objects/entities/training/entity";

export const findAllNewTrainings = async (
    connection: Connection
): Promise<TrainingEntity[]> => {
    const trainings: TrainingEntity[] = await connection.getRepository(TrainingEntity).find({
        relations: ["format", "organizer", "audience", "category"]
    });
    /**
     *  Сортировка массива по дате создания курса, дата в формате "22.03.20", самые новые -> начало массива
     */
    const sortedTrainings: TrainingEntity[] = trainings.sort(
        (trainingA, trainingB) => {
            const [ddA, mmA, yyA]: number[] = trainingA.createDate.split(".").map(Number);
            const dateA: Date = new Date(Number(`20${yyA}`), mmA, ddA);
            const [ddB, mmB, yyB]: number[] = trainingB.createDate.split(".").map(Number);
            const dateB: Date = new Date(Number(`20${yyB}`), mmB, ddB);

            return <any>dateB - <any>dateA;
        });

    return sortedTrainings;
}