import { Connection } from "typeorm";
import { TrainingEntity } from "../../../objects/entities/training/entity";
import { Workbook } from "exceljs";
import * as path from "path";
import { WorkSheet } from "xlsx/types";

export const createReportOnAllEventsAndWriteIt = async (
  connection: Connection
): Promise<string> => {
  const trainings: TrainingEntity[] = await connection
    .getRepository(TrainingEntity)
    .find({ relations: ["organizer"], order: { name: "ASC" } });

  const pathToSaveReport: string = path.join(
    __dirname,
    "../../../../../../uploads/report/"
  );
  const reportFileName: string = Date.now().toString().concat(".xlsx");
  const workBook: Workbook = new Workbook();
  const generalReportSheet: WorkSheet = workBook.addWorksheet(
    "Отчёт по всем событиям"
  );

  generalReportSheet.columns = [
    { header: "Название события", key: "training_name" },
    { header: "Описание события", key: "training_decs" },
    { header: "Сайт события", key: "training_site" },
    { header: "Название организатора", key: "organizer_name" },
    { header: "Адрес организатора", key: "organizer_address" },
    { header: "Сайт организатора", key: "organizer_site" },
    {
      header: "Контактная информация организатора",
      key: "organizer_contact-info",
    },
    { header: "Тип организатора", key: "organizer_type" },
    { header: "Дата начала события", key: "training_start-date" },
    { header: "Дата окончания события", key: "training_end-date" },
    { header: "Дата создания события", key: "training_create-date" },
  ];
  generalReportSheet.getRow(1).font = { bold: true };

  trainings.forEach((training, index) => {
    generalReportSheet.addRow([
      training.name,
      training.description,
      training.site,
      training.organizer.name,
      training.organizer.address,
      training.organizer.site,
      training.organizer.contactInfo,
      training.organizer.type,
      training.start,
      training.end,
      training.createDate,
    ]);
    if ((index + 2) % 2 === 0) {
      generalReportSheet.getRow(index + 2).fill = {
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

  return reportFileName;
};
