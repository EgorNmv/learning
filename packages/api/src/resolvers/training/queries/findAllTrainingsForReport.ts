import { TrainingEntity } from "../../../objects/entities/training/entity";
import { Connection } from "typeorm";
import * as moment from "moment";

/**
 * Returned Date obj by right string format(example: 09.04.2020)
 * @param {string} date - date in string number
 */
const getDateByString = (date: string): Date => {
  const splittedArrayByString: number[] = date.split(".").map(Number);
  const rightDate: Date = new Date(
    splittedArrayByString[2],
    splittedArrayByString[1] - 1,
    splittedArrayByString[0]
  );

  return rightDate;
};

export const findAllTrainingsForReport = async (
  connection: Connection,
  categoryId: number,
  organizerId: number,
  targetAudienceId: number,
  formatId: number,
  startDate: string,
  endDate: string
): Promise<TrainingEntity[]> => {
  if (!startDate || !endDate) {
    return [];
  }

  const trainings: TrainingEntity[] = await connection
    .getRepository(TrainingEntity)
    .find({
      where: {
        categoryId,
        organizerId,
        audienceId: targetAudienceId,
        formatId,
      },
      relations: ["organizer"],
    });

  const startSelectedDate: Date = moment(startDate).toDate();
  const endSelectedDate: Date = moment(endDate).toDate();

  startSelectedDate.setHours(0, 0, 0, 0);
  endSelectedDate.setHours(0, 0, 0, 0);

  const startSelectedTime: number = startSelectedDate.getTime();
  const endSelectedTime: number = endSelectedDate.getTime();
  const trainingsFilteredByDates: TrainingEntity[] = trainings.filter(
    (training) => {
      const startTrainingTime: number = getDateByString(
        training.start
      ).getTime();
      const endTrainingTime: number = getDateByString(training.end).getTime();

      // console.table([
      //   { name: "startTrainingTime", date: new Date(startTrainingTime) },
      //   { name: "endTrainingTime", date: new Date(endTrainingTime) },
      //   { name: "startSelectedDate", date: new Date(startSelectedDate) },
      //   { name: "endSelectedDate", date: new Date(endSelectedDate) },
      // ]);

      if (
        (startTrainingTime >= startSelectedTime &&
          startTrainingTime <= endSelectedTime) ||
        (startTrainingTime <= startSelectedTime &&
          endTrainingTime >= endSelectedTime) ||
        (startTrainingTime >= startSelectedTime &&
          endTrainingTime <= endSelectedTime) ||
        (endTrainingTime >= startSelectedTime &&
          endTrainingTime <= endSelectedTime)
      ) {
        return true;
      } else {
        return false;
      }
    }
  );

  return trainingsFilteredByDates;
};
