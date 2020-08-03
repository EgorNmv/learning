import { Connection } from "typeorm";
// import { TrainingEntity } from "../../../objects/entities/training/entity";
// import { In } from "typeorm";
import { In } from "../../../../../core/node_modules/typeorm";
import { RequestEntity } from "../../../objects/entities/request/entity";
import { Workbook } from "exceljs";
import * as path from "path";

export const createReportByTrainingIdsAndWriteIt = async (
  connection: Connection,
  ids: number[]
): Promise<string> => {
  const requests: RequestEntity[] = await connection
    .getRepository(RequestEntity)
    .find({ where: { trainingId: In(ids) }, relations: ["training"] });

  console.info("requests", requests);

  const workBook: Workbook = new Workbook();
  const workSheet = workBook.addWorksheet("Report");

  workSheet.columns = [
    { header: "Событие", key: "training_name" },
    { header: "Даты проведения", key: "training_dates" },
    { header: "Список участников", key: "participants_list" },
  ];

  // Add row using key mapping to columns
  workSheet.addRow(
    { package_name: "ABC", author_name: "Author 1" }
    // { package_name: "XYZ", author_name: "Author 2" }
  );

  // Add rows as Array values
  workSheet.addRow(["BCD", "Author Name 3"]);

  // Add rows using both the above of rows
  const rows = [
    ["FGH", "Author Name 4"],
    { package_name: "PQR", author_name: "Author 5" },
  ];

  workSheet.addRows(rows);

  const pathToSaveReport: string = path.join(
    __dirname,
    "../../../uploads/reports/"
  );
  const reportFileName: string = Date.now().toString();

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

  return reportFileName;
};
