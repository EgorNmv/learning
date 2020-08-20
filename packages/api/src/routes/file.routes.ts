import { Router } from "express";
import * as multer from "multer";
import * as path from "path";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../core/src/database-connection/database-connection";
import { TrainingEntity } from "../objects/entities/training/entity";
import { findTrainingById } from "../resolvers/training/queries/findTrainingById";
import { CategoryEntity } from "../objects/entities/category/entity";
import { findCategoryById } from "../resolvers/category/queries/findCategoryById";
import { MaterialEntity } from "../objects/entities/material/entity";
import { findMaterialById } from "../resolvers/material/queries/findMaterialById";
import * as checkDiskSpace from "check-disk-space";
import { platform, EOL } from "os";
import { appendFile } from "fs";

const writeDiskUsageAfterSaveFile = async (
  filename: string,
  fileType: string
): Promise<void> => {
  const path = platform() === "win32" ? "C:" : "/";
  const diskSpace: checkDiskSpace.CheckDiskSpaceResult = await checkDiskSpace(
    path
  );
  const freeMemoryPercentage: number = Math.round(
    (diskSpace.free * 100) / diskSpace.size
  );

  appendFile(
    "./logs/files.log",
    `${EOL}${new Date().toLocaleString()} записан файл ${filename} с типом ${fileType}. Свободной памяти: ${freeMemoryPercentage}%`,
    () => {
      console.info("Загружен новый файл");
    }
  );
};

const FILE_SIZE_LIMIT = 1024 * 1024 * 1000;
const router: Router = Router();
const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadFolder: string = path.join(__dirname, "../../../../uploads/");

    try {
      switch (req.body.type) {
        /**
         * Training img
         */
        case "1":
          uploadFolder += "training/";
          break;
        /**
         * Category img
         */
        case "2":
          uploadFolder += "category/";
          break;
        /**
         * Training material
         */
        case "3":
          uploadFolder += "material/";
      }
    } catch (e) {
      console.error("Ошибка при попытке загрузки файла", e);
    }

    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const extension: string = `.${file.originalname.split(".").pop()}`;

    cb(null, Date.now() + extension);
  },
});

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const typeOfFile: string = req.body.type;
  const availableImageFileExtensions: string[] = [
    "jpeg",
    "jpg",
    "gif",
    "png",
    "svg",
    "tiff",
    "bmp",
    "tif",
    "jfif",
    "svg",
    "ico",
  ];
  const avalibleMaterialFileExtensions: string[] = [
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "mdb",
    "txt",
    "csv",
    "pdf",
    "rtf",
    "htm",
    "html",
    "css",
    "xml",
    "mpg",
    "mpeg",
    "mp4",
    "avi",
  ];
  const extensionOfFile: string = file.originalname.split(".").pop();

  if (typeOfFile !== "3") {
    const isCurrentExtensionAreAllowed: boolean = availableImageFileExtensions.includes(
      extensionOfFile
    );

    isCurrentExtensionAreAllowed ? cb(null, true) : cb(null, false);
  } else if (typeOfFile === "3") {
    const isCurrentExtensionAreAllowed: boolean =
      availableImageFileExtensions.includes(extensionOfFile) ||
      avalibleMaterialFileExtensions.includes(extensionOfFile);

    isCurrentExtensionAreAllowed ? cb(null, true) : cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { files: 1, fileSize: FILE_SIZE_LIMIT, fields: 10 },
});

export default router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      const id: number = Number(req.body.id);
      const filename: string = req.file.filename;
      const fileType: string = req.body.type;
      const connection: Connection = await getLocallyConnection();

      writeDiskUsageAfterSaveFile(filename, fileType);

      if (id) {
        switch (fileType) {
          case "1":
            const training: TrainingEntity = await findTrainingById(
              connection,
              id
            );
            const updatedTraining: TrainingEntity = await connection
              .getRepository(TrainingEntity)
              .save({ ...training, label: filename });

            res.status(201).json({ training: updatedTraining });
            break;
          case "2":
            const category: CategoryEntity = await findCategoryById(
              connection,
              id
            );
            const updatedCategory: CategoryEntity = await connection
              .getRepository(CategoryEntity)
              .save({ ...category, label: filename });

            res.status(201).json({ category: updatedCategory });
            break;
          case "3":
            const material: MaterialEntity = await findMaterialById(
              connection,
              id
            );
            const updatedMaterial: MaterialEntity = await connection
              .getRepository(MaterialEntity)
              .save({ ...material, link: filename });

            res.status(201).json({ material: updatedMaterial });
        }
      } else {
        res.status(201).json({ filename });
      }
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);
