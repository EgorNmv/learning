import { Connection, Index } from "typeorm";
import { In } from "../../../../../core/node_modules/typeorm";
import { RequestEntity } from "../../../objects/entities/request/entity";
import { Workbook } from "exceljs";
import * as path from "path";
import { getUserBySub } from "../../okta/getUserBySub";

export const createReportByTrainingIdsAndWriteIt = async (
  connection: Connection,
  ids: number[]
): Promise<string> => {
  const requests: RequestEntity[] = await connection
    .getRepository(RequestEntity)
    .find({
      where: { trainingId: In(ids), status: 1 },
      relations: ["training"],
    });
  const pathToSaveReport: string = path.join(
    __dirname,
    "../../../../../uploads/report/"
  );
  const reportFileName: string = Date.now().toString().concat(".xlsx");
  const workBook: Workbook = new Workbook();
  const generalReportSheet = workBook.addWorksheet("General report");
  const fullReportSheet = workBook.addWorksheet("Full report");

  generalReportSheet.columns = [
    { header: "Событие", key: "training_name" },
    { header: "Даты проведения", key: "training_dates" },
    { header: "Количество принятых заявок", key: "count_of_accepted_requests" },
  ];
  generalReportSheet.getRow(1).font = { bold: true };

  const trainingsMapWithCountOfRequests: {
    [key: string]: { name: string; dates: string; countOfRequests: number };
  } = requests.reduce((acc, cur) => {
    if (acc[`${cur.trainingId}`]) {
      const training: { name: string; dates: string; countOfRequests: number } =
        acc[`${cur.trainingId}`];

      training.countOfRequests = training.countOfRequests + 1;

      return acc;
    } else {
      acc[`${cur.trainingId}`] = {
        name: cur.training.name,
        dates: `${cur.training.start} - ${cur.training.end}`,
        countOfRequests: 1,
      };

      return acc;
    }
  }, {});

  Object.keys(trainingsMapWithCountOfRequests).forEach((key, index) => {
    generalReportSheet.addRow([
      trainingsMapWithCountOfRequests[key].name,
      trainingsMapWithCountOfRequests[key].dates,
      trainingsMapWithCountOfRequests[key].countOfRequests,
    ]);
    if ((index + 2) % 2 === 0) {
      generalReportSheet.getRow(index + 2).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "D3D3D3" },
      };
    }
  });

  fullReportSheet.columns = [
    { header: "Событие", key: "training_name" },
    { header: "Даты проведения", key: "training_dates" },
    { header: "Список участников", key: "participants_list" },
  ];
  fullReportSheet.getRow(1).font = { bold: true };

  const usersFromOkta: Promise<any>[] = requests.map((request) =>
    getUserBySub(request.userId)
  );

  Promise.all(usersFromOkta)
    .then((res) => {
      const usersWithNamesMap: { [key: string]: string } = res.reduce(
        (acc, cur) => {
          if (acc[cur.id]) {
            return acc;
          } else {
            if (cur.profile) {
              acc[
                `${cur.id}`
              ] = `${cur.profile.firstName} ${cur.profile.lastName}`;
            }
            return acc;
          }
        },
        {}
      );

      requests.forEach((request, index) => {
        fullReportSheet.addRow([
          request.training.name,
          `${request.training.start} - ${request.training.end}`,
          usersWithNamesMap[`${request.userId}`],
        ]);
        if ((index + 2) % 2 === 0) {
          fullReportSheet.getRow(index + 2).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "D3D3D3" },
          };
        }
      });

      workBook.xlsx
        .writeFile(`${pathToSaveReport}${reportFileName}`)
        .then(() => {
          console.log(
            `Report ${reportFileName} successfully saved to ${pathToSaveReport}`
          );
        })
        .catch((err) => {
          console.log(`Error in saving the report ${reportFileName} `, err);
        });
    })
    .catch((e) =>
      console.info("Error in createReportByTrainingsAndWriteIt", e)
    );

  return reportFileName;
};
